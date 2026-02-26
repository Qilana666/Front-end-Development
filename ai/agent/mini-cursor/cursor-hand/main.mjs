import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,  //告知llm工具使用
} from '@langchain/core/messages';
// 模块化引入所有工具
import {
  readFileTool,
  writeFileTool,
  executeCommandTool,
  listDirectoryTool,
} from './all_tools.mjs';  
import chalk from 'chalk'; //让控制台日志打印出各种颜色

// 环境变量检查
if (!process.env.MODEL_NAME || !process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
  console.error(chalk.red('错误：缺少必要的环境变量，请检查 .env 文件'));
  process.exit(1);
}

console.log(chalk.blue('初始化模型...'));

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME, //比qwen-coder-turbo  更强大
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
    }
  });
console.log(chalk.green('模型初始化成功！'));

console.log(chalk.blue('绑定工具...'));
  // 工具列表 -》 绑定模型（绑定tools就是一下全部绑定了）
const tools = [
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool,
  ];

  // modelWithTools 绑定了工具，后续调用时会自动使用工具
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxIterations = 30) {
  try {
    console.log(chalk.blue(`执行查询：${query}`));
    
    // 检测任务完成情况 （循环，不要进行死循环 一直耗tokens）
    // 不用tool
    // 在用 还在进行中
    const messages = [
      new SystemMessage(`
        你是一个项目管理助手，使用工具完成任务
        当前工作目录：${process.cwd()}

        工具：
        1.read_file：读取文件内容
        2.write_file：写入文件内容
        3.execute_command：执行系统命令(支持workingDirectory参数)
        4.list_directory：列出目录内容

        重要规则 -execute_command:
        - workingDirectory 参数会自动切换到指定目录
        - 当使用workingDirectory参数时，不要在command中使用cd命令
        - 错误示例: { command: "cd react-todo-app && pnpm install", workingDirectory: "react-todo-app" }
        这是错误的！因为 workingDirectory 已经在 react-todo-app 目录了，再 cd react-todo-app 会找不到目录
        - 正确示例: { command: "pnpm install", workingDirectory: "react-todo-app" }
        这样就对了！workingDirectory 已经切换到 react-todo-app，直接执行命令即可

        回复要简洁，只说做了什么
        `),
      new HumanMessage(query),
    ];
    // 循环是agent的核心 llm 思考，规划，调整 不断迭代 直到任务完成 更加智能化
    for (let i = 0; i < maxIterations; i++){
      console.log(chalk.bgGreen(`⏳第 ${i+1} 轮思考中...`));
      const response = await modelWithTools.invoke(messages);
      messages.push(response);  // 加入到messages中 后续循环会使用
      
      console.log(chalk.cyan('AI 响应：'));
      console.log(response);
      
      if(!response.tool_calls||response.tool_calls.length===0){
        console.log(chalk.bgGreen(`\nAI最终回复：\n${response.content}\n`));
        return response.content;
      }
      for (const toolCall of response.tool_calls) {
        console.log(chalk.green(`调用工具：${toolCall.name}`));
        console.log(chalk.cyan(`参数：${JSON.stringify(toolCall.args)}`));
        
        const foundTool = tools.find(t => t.name === toolCall.name);
        if (foundTool) {
          try {
            // foundTool 存在 tool函数.invoke方法
            const toolResult = await foundTool.invoke(toolCall.args);
            console.log(chalk.green(`工具调用成功：${toolCall.name}`));
            messages.push(new ToolMessage(toolResult, toolCall.id));
          } catch (error) {
            console.error(chalk.red(`工具调用失败：${error.message}`));
            messages.push(new ToolMessage(`工具调用失败：${error.message}`, toolCall.id));
          }
        } else {
          console.error(chalk.red(`未找到工具：${toolCall.name}`));
          messages.push(new ToolMessage(`未找到工具：${toolCall.name}`, toolCall.id));
        }
      }
    }
    // messages 记录了所有的交互记录 包括 问题 工具调用 工具回复 最终回复
    return messages[messages.length-1].content;
  } catch (error) {
    console.error(chalk.red(`执行错误：${error.message}`));
    return `执行错误：${error.message}`;
  }
}

const case1 = `
        创建一个功能丰富的 React TodoList 应用：

        1. 创建项目：echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts
        2. 修改 src/App.tsx，实现完整功能的 TodoList：
        - 添加、删除、编辑、标记完成
        - 分类筛选（全部/进行中/已完成）
        - 统计信息显示
        - localStorage 数据持久化
        3. 添加复杂样式：
        - 渐变背景（蓝到紫）
        - 卡片阴影、圆角
        - 悬停效果
        4. 添加动画：
        - 添加/删除时的过渡动画
        - 使用 CSS transitions
        5. 列出目录确认

        注意：使用 pnpm，功能要完整，样式要美观，要有动画效果

        之后在 react-todo-app 项目中：
        1. 使用 pnpm install 安装依赖
        2. 使用 pnpm run dev 启动服务器
        `;

// 执行代理任务
async function main() {
  console.log(chalk.yellow('开始执行代理任务...'));
  console.log(chalk.blue('任务：创建React TodoList应用'));
  const result = await runAgentWithTools(case1);
  console.log(chalk.green('\\n最终结果：'));
  console.log(result);
}

// 运行主函数
main().catch(error => {
  console.error(chalk.red('执行失败：'), error);
  process.exit(1);
});