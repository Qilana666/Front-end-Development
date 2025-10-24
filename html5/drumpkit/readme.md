# HTML5 敲击乐

## HTML5 web 应用

- 编写页面结构
- 模块化职责分离
  专业、好维护、可拓展
  css 使用 link 标签，在 head 中引入
  js 负责交互，script 在 body 的底部引入
- 浏览器是执行前端代码的程序
  - 下载并解析 html 结构
  - link 引入 css
    html（结构） + css（样式） 结合 静态页面了
    前端的天职是 快速实现页面
  - script 交互放到后面
    阻塞 html 的下载和运行

## 静态页面

HTML & CSS 生成静态页面

- CSS Reset（CSS 重置） 的作用是通过统一或清除不同浏览器对 HTML 元素的默认样式差异，为样式开发提供一个一致、可预测的基础。
- \*选择器，匹配所有元素，性能不好
- 业界推荐的 css reset -列出所有的元素，代替\*
- html 结构
  通过选择器
  标签选择器
  类选择器
- 背景的使用
  background-size cover contain
  cover 以盒子为主，背景图片会等比例放大/收缩，覆盖整个盒子，可能会有部分背景图片被裁剪
  contain 以背景图片为主，背景图片会等比例放大/收缩，直到盒子里面完全显示图片
  background-position bottom center
  background-repeat no-repeat
- rem,vh 相对单位，解决移动端 设备尺寸不一致的问题
  建议不要使用 px 绝对单位
  vh 是相对于视窗
  rem 相对于 html 根元素的字体大小
  html font-size 10px

- flex + 居中 完成 布局
  - display:flex;弹性布局魔法，手机尺寸不一致，弹性布局
    9 个.key 子元素就不会换行了（块级） 在一行
  - justify-content:center; 水平居中
  - align-items:center; 垂直居中
  - 使用 vh,rem 单位代替 px 绝对单位 适配移动端
