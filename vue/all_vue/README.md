# 现代前端开发 **工程化**
- npm init vite
  新建项目
  vite ？
  vue 作者 尤雨溪 开发的现代前端**构建**工具，他利用浏览器原生ES模块，实现**极速的冷启动(快)**和**热更新**，大幅提升开发体验

  - 得到一个比较标准的项目开发模板
    得益于优秀的架构

## 优秀的架构
- vite 会将跟目录下index.html 作为首页启动
  #root 组件的挂载点
  App.vue 根组件
- vite 为了构建，是具体业务开发之前的基石
  - 返回了项目开发模版
  - npm i 装依赖
    package.json 项目依赖配置文件
    vite 构建的大管家
    - 开发的是前端项目 用Vue3 开发目录在src/(前端开发目录)下  
    - vite 是基于node的，见 D:\Workspace\lesson_zp\vue\all_vue\1.png
      npm i vite
      npm run dev
    - localhost:5173 项目启动地址
    - 自动打开浏览器 node 操作 os
    - 热更新 监听任何文件的修改，浏览器会自动刷新