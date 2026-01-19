## notes AI全栈项目

- 登录功能
- 文章系统
- AIGC 功能
- nestjs 后端

### shadcn

- 页面由组件构成，选用第三方组件库
- 按需加载
- 组件下载到本地，可以随意的修改
- pnpm i shadcn@lastest
- npx shadcn@latest init
  - npx 是 Node.js 自带的工具，用于*临时*（不用预先安装，可以试用，测试那边，用完会删除）安装并*执行* npm 包中的命令，无需全局或本地预先安装。
    - shadcn 提供命令行
    - 可以添加组件
      - 比如 button
      - npx shadcn@latest add button
  - 出问题了
  - 基于tailwindcss （https://tailwindcss.com/，，，一定要在初始化类型了的项目中下载）
  - 配置alias 设置路径别名 ，更短，好用

  pnpm i -D @types/node（_开发中使用_）

### vite的配置

- vite.config.ts 配置对象
  -pligins 插件（式开发）
  react | vue
  tailwindcss
- resolve
  alias 路径别名
  @ -> \_\_dirname/src
  npm i -D @types/node node 来到ts 开发的时候
  单独安装了node的类型申明文件

- ts配置文件
  根目录下的tsconfig.app.json
  compilerOptions 目录下的输出建议
  baseurl
  path

### 路由

- 路由懒加载（性能优化的关键）
- suspense+lazy 实现路由的懒加载
- 自定义loading 组件
