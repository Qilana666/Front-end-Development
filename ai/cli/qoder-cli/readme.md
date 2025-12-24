# qoder-cli

命令行 AI coder Agent
基于阿里 qwen 编程大模型，构建 AI Agent 的命令行框架

- 安装
  npm i -g @qoder-ai/qodercli
- 查看版本号
  qodercli -v
- qodercli
  - /init 初始化项目 AGENTS.md
    AI 开发项目 给 llm 项目规矩的上下文

## 为啥有 Trae/Cursor 还需要 qoder-cli,claude-cli

未来的**开发界面** 不会只有 IDE ,还会有 cli,最好的是两者融合
IDE 适合深度上下文和复杂任务处理
CLI 具备速度、灵活性和自动化能力
双 AI 引擎的新 AI 编程模式
端到端的 AI 自主开发模式

## MCP Model Context Protocol

MCP 让 AI 应用以统一方式向大模型提供结构化上下文（如工具、文档、数据库）

- qodercli mcp add playwright -- npx "@playwright/mcp@latest"
- qodercli mcp add context7 -- npx @upstash/context7-mcp@latest
- qodercli mcp list

## context7

当 llm 生成的代码是老版本，或不太行的时候，context7 来了
context7 mcp 服务 在生成代码指令发出前，带上指定的版本的库的文档作为上下文
