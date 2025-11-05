# HTML/CSS/JS 是如何渲染页面的

- 浏览器渲染页面有哪些流程
- HTML/CSS/JS 输入
- 浏览器 (chrome)
  渲染有哪些工作构成？
- 输出
  页面，一张图
  1s 绘制 60 次
- 渲染流程
  - 流程复杂
- 时间开销
  性能优化

- HTML/CSS/JS 1.构建 DOM 树

  - 输入 HTML 字符串
    树->递归
    标记->节点
    html 由标记跟文本组成
    html youbiaojigenwenbenzuc
    浏览器不太好直接处理，字符串
    树状结构
  - 输出 DOM 树
    document.getElementByid('#root')
    内存中就有了 document DOM 根节点

  - 如何正确使用 HTML?
    - 认真把 html 写好，语义化
    - SEO 就会好
      搜索引擎优化 Search Engine Optimization
      在百度输入查询
      百度派出蜘蛛去爬取各家网站
      针对 html 算法分析
      查询内容和相关网页的相关性
  - 结构语义化标签
    header footer main aside section
  - 功能语义化
    h1-h5
    code
    ul>li

- main 放在前面 aside 放后面？

  - 主内容先下载，再下载侧边栏
  - flex order -1

- 浏览器怎么理解 css? 字符串文本是不适合的，也用树状结构
  - CSSOM 树 CSS Object Model 树
    选择器{
    key:value;
    }
  - 找到相应的 html 节点，css 节点和 html 节点结合
- html/css/js->DOM 树构建（input:html,output:dom->cssom()页面）
