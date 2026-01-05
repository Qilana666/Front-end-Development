# 原子 css

- bad
  样式带有太多的业务属性，在一个或少数类名 ，样式几乎不能复用
- 面向对象 css

  - 封装 基类
  - 多态 业务
  - 组合

- 将我们的 css 规则拆分成原子 css
  - 大量的基类 好富用
  - 组合起来
  - tailwindcss 是一个原子 css 框架
    几乎不用在写 css 了
  - tailwindcss 原子 css 类名
    llm 自然语言处理
    - 生成界面？
      propmt 描述布局、风格 和语义化好的 tailwindcss 更有利于生成
  - 不用离开 html 写 css 了

## tailwindcss 配置

- 安装 tailwindcss 和 vite 插件
- vite.config.js 配置

## Fragment

文档碎片结点

- 解决 react 单一根结点问题
  树状结构，好遍历
- 不渲染到页面上 杜绝了额外且不需要的 div 结点。
  react 中 <></> Fragment 组件 ，唯一的根节点，性能优化
