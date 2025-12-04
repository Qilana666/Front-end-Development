# 全栈应用开发

- 岗位
  - 前端工程师
  - 大前端工程师（node）
  - 全栈工程师
  - 全干工程师（AI 协助）
  - ai 应用开发工程师

- 全栈目录结构
  - fontend 提供界面跟交互
  - backend  提供
    - server 提供web服务 处理前端请求，返回数据
    - 数据接口服务 api
      pnpm i json-server
    - users.json .sql 都可以作为数据文件来处理  .json和sql
      格式
    - package.json "scripts" 是node 后端脚本
      npm run dev 启动后端服务
      json-server --watch users.json --port 3001
  - llm
    - 提供大模型服务
    - 要运行node main.mjs开启llm端
  - 要实现项目的正常交互，前端后端，LLm 服务都需要启动
