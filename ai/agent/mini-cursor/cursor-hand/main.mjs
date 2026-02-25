import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,  //告知llm工具使用
} from '@langchain/core/messages';
import {
  readFileTool,
  writeFileTool,
  executeCommandTool,
  listDirectoryTool,
} from './all_tools.mjs';
import chalk from 'chalk'; //让控制台日志打印出各种颜色

// 测试基本输出
console.log(chalk.green('=== 开始执行 main.mjs ==='));
console.log(chalk.yellow('当前目录：', process.cwd()));

// 环境变量检查
console.log(chalk.blue('检查环境变量...'));
console.log(chalk.cyan('MODEL_NAME:', process.env.MODEL_NAME));
console.log(chalk.cyan('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '已设置' : '未设置'));
console.log(chalk.cyan('OPENAI_BASE_URL:', process.env.OPENAI_BASE_URL));

if (!process.env.MODEL_NAME || !process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
  console.error(chalk.red('错误：缺少必要的环境变量，请检查 .env 文件'));
  process.exit(1);
}

console.log(chalk.green('环境变量检查通过！'));

// 全局变量
let model;
let modelWithTools;
let tools;

console.log(chalk.blue('初始化模型...'));
try {
  model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME, //比qwen-coder-turbo  更强大
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
    }
  });
  console.log(chalk.green('模型初始化成功！'));

  console.log(chalk.blue('绑定工具...'));
  tools = [
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool,
  ];
  console.log(chalk.cyan('工具列表：', tools.map(tool => tool.name).join(', ')));
  
  // modelWithTools 绑定了工具，后续调用时会自动使用工具
  modelWithTools = model.bindTools(tools);
  console.log(chalk.green('工具绑定成功！'));
} catch (error) {
  console.error(chalk.red('初始化错误：', error.message));
  console.error(chalk.red('错误堆栈：', error.stack));
  process.exit(1);
}

async function runAgentWithTools(query, maxIterations = 30) {
  try {
    console.log(chalk.blue(`执行查询：${query}`));
    
    const messages = [
      new SystemMessage(
        `
        你是一个项目管理助手，使用工具完成任务。
        你当前工作目录：${process.cwd()}

        工具：
        1.read_file:读取文件
        2.write_file:写入文件
        3.execute_command:执行命令（支持workingDirectory 参数）
        4.list_directory:列出目录

        重要规则 - excute_command:
        - workingDirectory 参数会自动切换到指定目录
        - 当使用workingDirectory 参数时，不要在command中使用cd命令
        - 错误示例: { command: "cd react-todo-app && pnpm install", workingDirectory: "react-todo-app" }
        这是错误的！因为 workingDirectory 已经在 react-todo-app 目录了，再 cd react-todo-app 会找不到目录
        - 正确示例: { command: "pnpm install", workingDirectory: "react-todo-app" }
        这样就对了！workingDirectory 已经切换到 react-todo-app，直接执行命令即可

        回复要简洁，只说做了什么
        `
      ),
      new HumanMessage(query),
    ];
    
    // 循环是agent的核心 llm 思考，规划，调整，不断迭代 直到任务完成，更加智能化
    for (let i = 0; i < maxIterations; i++) {
      console.log(chalk.bgGreen('⏳正在等待AI思考...'));
      const response = await modelWithTools.invoke(messages);
      messages.push(response);
      
      console.log(chalk.cyan('AI 响应：'));
      console.log(response);
      
      if (!response.tool_calls || response.tool_calls.length === 0) {
        console.log(chalk.green(`\n AI最终回复：\n ${response.content}`));
        return response.content;
      }
      
      for (const toolCall of response.tool_calls) {
        console.log(chalk.green(`调用工具：${toolCall.name}`));
        console.log(chalk.cyan(`参数：${JSON.stringify(toolCall.args)}`));
        
        const foundTool = tools.find(tool => tool.name === toolCall.name);
        if (foundTool) {
          try {
            const toolResponse = await foundTool.invoke(toolCall.args);
            console.log(chalk.green(`工具调用成功：${toolCall.name}`));
            messages.push(new ToolMessage(toolResponse, toolCall.id));
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
    
    console.error(chalk.red('执行超时，达到最大迭代次数'));
    return '执行超时，请尝试简化任务';
  } catch (error) {
    console.error(chalk.red(`执行错误：${error.message}`));
    return `执行错误：${error.message}`;
  }
}

// 示例用法
console.log(chalk.yellow('开始执行代理任务...'));
const query = process.argv[2] || '列出当前目录下的文件';
runAgentWithTools(query).then(result => {
  console.log(chalk.green('\n最终结果：'));
  console.log(result);
}).catch(error => {
  console.error(chalk.red('执行失败：'), error);
});

