//服务器端代码
//http是node 内置的模块
import http from "http";
//web服务器 伺服状态 http://www.baidu.com
//用户  chrome 请求 http://www.baidu.com
//BS架构 
http.createServer((req, res) => {
  //callback来处理用户的请求
  //req 请求对象
  //res 响应对象
  console.log(req);
  res.end("hello world");
}).listen(3000);
//监听3000端口
//用户请求 3000端口 ，会被服务器端处理
//用户  chrome  http://localhost:3000