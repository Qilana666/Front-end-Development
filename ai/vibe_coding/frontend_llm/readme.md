# 前端调用大模型

- llm 可以以前端http 请求的方式调用
- trae 介入开发工程化
  - 代码 
  - 工程化

- 项目初始化
- 创建一个通用的原生 HTML/CSS/JS 项目
- vite 全栈脚手架搭建
  帮我初始化vite配置

## fetch 复杂请求
- llm调用可以通过http请求的方式调用
- 请求
  - 请求行  Method(POST) url(api.deepseek.com/chat/completions) HTTP/1.1 (版本) 
  - 请求头
    - Content-Type: application/json
    - Authorization: Bearer ${apiKey}  令牌的固定前缀
  - 请求体（POST）
    - 文本，二进制发送，不可以直接发送JSON对象
    JSON.stringify()
- fetch(url, {
  method:,
  headers,
  body
})
- fetch promise 实例
  .then
  await 异步变同步比then 更方便

- apikey 放到 .env 中 后端行为
  - 全栈项目  vite(全栈项目脚手架) 环境变量配置