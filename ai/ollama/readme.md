# Ollama

- 闭源模型（靠 tokens 收益）
  OpenAI 5.1
  Claude 代码生成
  Gemini 3.0+
  Deepseek
  Qwen

  ollama 可以帮助我们部署本地开源模型

- 参数规模
  ollama 开源模型部署到本地 硬件需求
  GPU
  内存
  云端部署 服务器 算力
- toB 的一些 AI 服务 安全

  - 将设计稿给 LLM，生成前端代码
  - cursor,整个代码都上传

- 如何解决 ai 安全问题？
  - 使用自家 ai 产品或模型
  - 自己部署大模型
    ollama pull qwen2.5:0.5b
    ollama list
    ollama run qwen2.5:0.5b

## ollama

- ollama 是一个本地部署大模型的工具
- ollama pull 模型名称
- ollama run 模型名称
  - :11434 端口 开源大模型 api 服务
