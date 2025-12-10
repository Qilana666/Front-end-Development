// node 服务器端代码
const http = require("http"); // CommonJS 模块引入
const url = require("url");

// 模拟用户数据
const users = [
  { id: 1, name: '舒俊', email: '123@qq.com' },
  { id: 2, name: '陈俊璋', email: '1232@qq.com' },
  { id: 3, name: '徐行', email: '121@qq.com' },
];

// 生成 HTML 表格的函数
function generateUserHTML(users) {
  const userRows = users.map(user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User List</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
        </style>
    </head>
    <body>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${userRows}
            </tbody>
        </table>
    </body>
    </html>
  `;
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/users') {
    // 返回用户列表页面
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); // 注意：是 charset，不是 chatset
    const html = generateUserHTML(users); // 正确调用函数
    res.end(html);
  } else {
    // 其他路径返回 404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Page not found');
  }
});

// 监听端口
server.listen(1332, () => {
  console.log('Server is running on http://localhost:1332');
});