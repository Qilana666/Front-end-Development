# tailwindcss login 页面

- 前端工程
  - vite
  - tailwindcss
    - 登入官网，配置一下 tailwindcss https://tailwindcss.com/docs/installation/using-vite

## 登录业务

- 受控组件 react
  - lucide-react 图标库 第三方组件库
    安装 pnpm i lucide-react
  - 抽象的表单事件处理 js 逻辑
  - loading 业务 登录中 界面不一定是静态的 界面状态 由数据驱动
  - showPassword 密码显示隐藏
  - tailwindcss 业务
    - min-h-screen 100vh
    - w-full 宽度 100%
    - max-w-md 最大宽度 为了适配
    - shadow-xl shadow-slate-200/60
    - space-y-6 除了第一个元素，其他元素 间距 6 个单位，非常好的工具
    - 选择 placeholder: focus：这样的一些伪类
    - 适配 根据 media query 宽度
      Mobile First
      - md 媒体选择器
      - p-8 md:p-10 内边距 8px 10px
      - sm
      - lg
      - rounded-3xl 圆角 3xl
