初始化项目配置，并安装一个能快速搭建模拟后端 API 的工具，方便快速开发和测试。
1.npm init -y
2.pnpm i json-server

将 package.json 中的
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
更改为
"scripts": {
"dev":"json-server --watch users.json --port 3001"
},

npm run dev
