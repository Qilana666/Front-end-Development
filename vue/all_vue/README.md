# 现代前端开发 **工程化**

- npm init vite
  新建项目
  vite ？
  vue 作者 尤雨溪 开发的现代前端**构建**工具，他利用浏览器原生 ES 模块，实现**极速的冷启动和热更新**，大幅提升开发体验

  - 得到一个比较标准的项目开发模板
    得益于优秀的架构

## 优秀的架构

- vite 会将跟目录下 index.html 作为首页启动
  #root 组件的挂载点
  App.vue 根组件
- vite 为了构建，是具体业务开发之前的基石
  - 返回了项目开发模版
  - npm i 装依赖
    package.json 项目依赖配置文件 后端
    vite 构建的大管家
    - 开发的是前端项目 用 Vue3 开发目录在 src/(前端开发目录)下
    - vite 是基于 node 的，见 D:\Workspace\lesson_zp\vue\all_vue\1.png
      npm i vite
      npm run dev
    - localhost:5173 项目启动地址
    - 自动打开浏览器 node 操作 os
    - 热更新 监听任何文件的修改，浏览器会自动刷新
  - src/
    - assets/ 静态资源目录
    - components/ 组件目录
    - App.vue 根组件
    - main.js 入口文件
    - style.css 全局样式文件
  - volar 是 vue 官方的 vscode 插件，提供了 vue3 的语法高亮和智能提示
  - vue devtool 是 vue 官方的浏览器(chrome)插件，提供了 vue3 的调试工具

## 多个页面呢？

vue-router
npm i vue-router

- 配置路由
- 新建页面
  views/
- 切换
