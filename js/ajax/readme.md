# Ajax 异步数据请求

Ajax 全程“Asynchronous JavaScript and XML”（异步 JavaScript 和 XML），XML 已经被 JSON 取代，
所以现在更多的是指异步 JavaScript 和 JSON。

- 流程
  - 实例化 new XMLHttpRequest();
  - open 打开一个请求
    method GET / POST
    url
    async true / false
  - send 发送请求
    - GET 方法，send 可以不传参
    - POST 方法，send 可以传参
  - 事件监听
    - onreadystatechange
      status 200
      readyState 4
      JSON.parse(xhr.responseText)
- readyState 状态
  - 0 初始化
  - 1 打开
  - 2 发送
  - 3 接收
  - 4 完成
