# getJSON

- ajax 与 fetch 相比
  - fetch 是基于 Promise （.then）实现的，无需回调函数
  - ajax 是基于回调函数实现的，代码复杂
- 如何**封装**一个 getJSON 函数，使用 ajax
  支持 promise
  - get 请求方法
  - 返回是 JSON
  - ajax thenable
