npm init -y

pnpm i json-server

将 package.json 中的
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
更改为
"scripts": {
"dev":"json-server --watch users.json --port 3001"
},

npm run dev
