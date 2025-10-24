# OpenAI AIGC Models

## openai 提供了llm sdk
- 初始化了一个后端项目
  node 是js的后端实现，命令行实现
  npm node package management node  包管理
  npm init -y
  npm i openai@4.71.0（把openai 库安装到项目中）
  - node 以其轻量化开发 ，适合中小型项目，占据大量开发市场
  - openai llm事实上的标准
    - completion 接口 完成
    - chat接口
  ## LLM
  - 来自openai
  - LLM gpt-3.5-turbo-instruct
  - 文本生成
  - 安装了openai sdk package
  - 实例化，apiKey,baseURL
  - 调用completions.create 方法
  - 本质是向api.openai /completions发送一个POST 请求
  - 返回的json choices[0].text
