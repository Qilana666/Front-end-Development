# AIGC 综述

- AIGC
  生成式的人工智能

  - 生成文本 gpt-3.5-turbo-instruct
  - 生成图片 dall-e-2

- 安装了 dotenv openai
  优化一下？
  已经安装了，不需要重复安装
  共享？更快，节省空间
  pnpm（Performant npm）是一个快速、节省磁盘空间的 Node.js 包管理器，它通过使用硬链接和符号链接来避免重复安装相同的包，从而显著提升安装速度并减少磁盘占用。
  - npm init -y
    初始化后端环境 package.json 项目描述文件
    - pnpm i dotenv openai
    - node main.js
      node 以命令运行 main.js
      main.mjs 单点路口 方便管理
      mjs 模块化的 js import from 导入模块
      程序运行后，将是一个独立的进程（process）
      进程（家长）是分配资源的最小单位
      前端 document,后端 process
      process.env 环境变量 配置或参数
  - dotenv
    读取.env 文件中的内容添加到 process.env 环境变量
