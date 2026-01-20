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
- 路由守卫
  - user store isLogin

pnpm i zustand

### BackToTop 组件

- 通用组件
- 自有状态 isVisible
  - 滚动超过多少像素后显示按钮
  - 点击按钮滚动到顶部
- onScroll 判断一个阈值
  - 超过阈值后显示按钮
  - 低于阈值后隐藏按钮
- scroll 事件频繁触发，性能优化
  节流 utils 目录下 工具函数
- 组件卸载时 移除事件监听，防止内存泄露

### 幻灯片组件 slides

- shadcn 提供了 Carousel、CarouselContent、CarouselItem、一组组件（外->内），层次结构
  npx shadcn@latest add carousel
- 自动播放的功能作为插件引入，shadcn 简单，性能好，定制性更好
  useRef 持久化可变的对象
  plugins=[]
- api 向外暴露Carousel的各种功能
  selectedIndex 私有状态
  api onSelect 方法 改变之
- 指示点
  循环输出
  动态类名
- css
  - transition-all
  - gradient _线性渐变_ 取代图片（渐变色）做背景
    性能优化 图片做背景 http下载的开销 减少http并发数

### store

- user 全局共享
- 每个页面级别组件都有自己独立的store
  组件 UI 和数据分离

### Post List

- 数据怎么提供呢？
  - 真实数据 在后端
  - axios 请求 后端api
  - 前端要等待后端接口吗？ 不能等，前后端分离的基础上，前端可以自行解决数据需求？
    _mock_ 一下，伪造请求
    api 接口文档
    GET /API/post?page=1&limit=10 返回内容
    {
    status:200,
    list:Post[]
    }
    只要切换到后端真正的地址，无缝对接

### mockjs

- 前端接口伪造，开发时候用，上线后切换成后端接口
  pnpm i vite-plugin-mock -D
  配置 vite.config.ts
  pnpm i mockjs
  vite 启动 mock
- 前后端确立接口开发文档

### posts mock

- 阅读接口文档
- mockjs 语法
  mockPath posts.js
  export default{
  {
  url:,
  method:,
  response:(req,res)=>{}
  }
  }
  - mockjs 随机功能 @
  - 分页机制
    - page,limit parseInt
    - start,end ,total,totalPage 计算分页范围
    - slice 分页数据
    - pagination 分页信息

    pnpm i axios
