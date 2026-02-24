# 手写cursor 最小版本

- 千问点奶茶 豆包 元宝
  互联网计算向Ai Agent 推理，运行的一个划时代的产品，更复杂，更智能，更强大
- OpenClaw 养虾
  一人公司
  虚拟数字人，多Agent ppt 算账 市场
  编程Agent(cursor)  
  任务拆解、计划，找到一批需要的Agent 完成任务
  Manus?
  开源版本的Manus
- seedance 抖音视频的数据

- 从llm prompt engineering -> Agentic（智能体） Engineering(全栈)
  Engineering(全栈)

- AI Agent 如何打造？
  - 大模型 (LLM)
    直接调用大模型？获得智能，生成代码
    gemini 3.1 pro
  - 记忆 (Memory)
    你上周和它聊过的消息，它是不是记不住？(bug)
  - 工具 (Tools)
    你让他帮你访问一个网页，做一些事情
  - RAG
    你想让他基于公司内部的私密文档做一些解答

    AI Agent=LLM + Memory + Tools + RAG

## Agent 是什么？

其实就是给大模型扩展了Tool和Memory，他本来就可以思考、规划、你给他用tool扩展了能力，他就可以**自动**做事情
用memory 管理记忆，他就可以记住你想它记住你想它记住的东西，还可以使用RAG查询内部知识来获取知识（context）

这样一个知道内部知识，能思考规划、有记忆，能够帮你做事情的扩展后的大模型，就是一个AI Agent

## Tool 工具

### 用react 创建一个todolist

- 任务，期待cursor 编程Agent 完成
- llm 思考（thinking）,规划（planing）aigc 生成代码
- tool 让llm 扩展 有读写文件的能力，项目就生成了
- tool 在bash 执行命令

### 用react 创建一个todolist

- 任务，期待cursor 编程Agent 完成
- llm 思考（thinking）,规划（planing）aigc 生成代码
- tool 让llm 扩展 有读写文件的能力，项目就生成了
- tool 在bash 执行命令

### Langchain

AI Agent 框架 提供了memory tool rag
后端功底（node） nest.js

AI 全栈Agent 开发

## LLM with Tools

- llm 选择
  qwen-coder
- tools
  【read,write,execute】
  pnpm i @langchain/openai
  llm with tools
