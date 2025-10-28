# css 超级 stylus

- 更快的 css
  css rules css file
  选择器
  .card{
  width: 200px;
  height: 300px;
  }
- stylus css 超级
  npm i -g stylus
- Stylus 是一门富有表现力的 CSS 预处理器，语法简洁优雅，支持变量、函数、混合（mixins）、嵌套等特性，
  能大幅提升 CSS 的编写效率和可维护性。
  但是浏览器只能直接解析 css,stylus 是一种预处理器，所以需要编译成 css

- 编译脚本
  stylus style.styl -o style.css
  边写边编译
  stylus style.styl -o style.css -w(订阅发布者文件)

- 弹性布局

  - display:flex; 弹性格式化上下文
  - 移动端布局的主角
  - 父子（们）一起的一种布局方案
  - 子元素块级能力丢失，不会换行，多列布局？
  - justify-content 水平方向上的对齐方式
    align-items 垂直方向上的对齐方式
    flex 专用
    默认 flex-direction row|column
    justify-content 主轴对齐
    align-items 侧轴对齐
    子元素们设置 flex 1 等比例分配空间
    &.active 这个嵌套是和上级是同一级别.panel 一个状态

- transition 过渡动画
  比 animation 简单，没有 keyframes,属性的改变，添加过渡效果
  transition: all 0.7s ease-in
  all 任何属性的改变
  transition: opacity 0.3s ease-in 0.4s
  opacity 透明效果

  transition-delay 延迟时间

- @media (max-width: 480px)
  媒体查询 响应式布局
  iphone 414px
  max-width:480px 查询条件
  对特定设备适配
- stylus 增强了 css 的编程性
  - 嵌套
    模块化的能力
    作用域
    自动添加前缀
