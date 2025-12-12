# 响应式数据驱动界面的诞生
  - 前后端分离
  - ref 响应式数据  将数据包装成响应式对象
  - 界面由{{}} v-for 进行数据驱动 template 渲染-
  - 聚焦于业务，数据的变化


## 纯后端的套模版
- mvc 开发模式
  - model 数据
      mysql 数据库抽象

  - view 模版 视图
      html {{todos}}

  - controller 业务逻辑
    控制器 查询model 
    渲染view 模版

 - 如果这个端口在占用，更改地址,执行命令nodemon 1314 然后要记得修改原本的端口 为什么要使用这条命令
    - http 伺服
      req.url
      res.end
        - html 静态部分
        - 动态部分，由数据驱动

## 前后端分离
- 前端
  html/css/js 交互的样式
  ajax/fetch 前端可以主动地拉取数据
  http://127.0.0.1:5500/lesson_zp/vue/ref/demo2/frontend/index.html
- 后端
  没有返回html 只有数据
  数据接口 api 
  http://localhost:3000/users

- 优势是开发人员解耦
  - 前端开发人员 只需要关注 数据的展示 用户体验
    需要做大量的dom 编程 先找节点（不是业务）
    focus 业务？ 数据驱动的界面
  - 后端开发人员 只需要关注 数据的处理 并发性能

## 响应式数据驱动
- 响应式数据**驱动**的界面（template）
  {{}}
  根在后端套模版的业务中来
  不用做DOM API  麻烦，性能还不好

- 前后端分离