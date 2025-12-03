初始化项目配置，并安装一个能快速搭建模拟后端 API 的工具，方便快速开发和测试。
1.npm init -y // 初始化项目配置是什么？ 生成一个 package.json 文件，包含项目的基本信息和依赖配置。
2.pnpm i json-server // 安装 json-server 工具  用于快速搭建模拟后端 API 的工具。 为什么用pnpm？ 因为它的速度快，占用空间小。

添加一条数据 -》  创建users.json 文件，在其中添加一条数据，格式为 JSON 格式。 （JSON 格式是一种轻量级的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。其中不允许有注释）

JSON格式示例

将 package.json 中的
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
更改为
"scripts": {
"dev":"json-server --watch users.json --port 3001"
},

"scripts"里的dev 脚本 用于启动 json-server 工具，监听 users.json 文件的变化，端口号为 3001。

npm run   // 查看 package.json 中定义的所有脚本命令。
npm run dev  // 启动 json-server 工具，监听 users.json 文件的变化，端口号为 3001。

package.json 中的 "description" 字段中的内容是自动生成的吗？
不是，"description" 字段是手动添加的，用于描述项目的功能和作用。
