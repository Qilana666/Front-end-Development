## css module

- css 层叠样式表
  - 默认是没有作用域的
  - 先后顺序和优先级
  - 在类名前面限定 css的一定的作用域能力

- react vue 如何给css 带来scope的能力

## css module

- react 里的样式文件是和组件分开的
- module.css 是css module 的文件
  可以将css 作为js对象来导入
  react 将css 文件去编译 就加上唯一hash部分
- import styles from '.module.css'
  styles 就是css in js 的对象
  jsx 里面用{styles.类名}
- hash 唯一类名 组件样式 是唯一的 保护组件的安全
  - 不会污染全局 也不受外界的影响
- 多人协作的，开源共享的项目中特别要注意
