# langchain

2022 年 chatgpt 横空出世 基于 transformer 架构 aigc
langchain 比 chatgpt 还早 推出了 1.0+版本
AI 应用开发框架

## langchain = lang + chain

language LLM
chain? n8n coze 可以分成不同的任务节点 node 链接起来 (基于大预言模型，链式组成工作流)
也是基于 node 开发的

- 初始化 langchain 应用
  - npm init -y 变成一个后端项目
    - 项目使用 esm
      package.json 中 "type": "module"
  - npm i langchain 安装 langchain 库
  - pnpm i @langchain/deepseek 让 llm 变得可拔插
    deepseek llm 有性价比，更细换代频繁
    适配器
  - pnpm i dotenv 加载环境变量
  - langchain 统一接口
    completion 接口
    chat 接口

##
