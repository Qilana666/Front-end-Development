# css 大海

- 何为css --Cascading Style Sheets 层叠样式表?
  - 一个属性--property与值的键值对为声明
  - 声明块 多个声明组成一个声明块
  - 声明块如果需要作用到对应的html元素,需要在声明块前添加选择器
  - cssRules 组成了样式表

- 层叠？

- margin 重叠 最大的
- 小数单位px 怎么处理的?
- inline 元素在有些情况下不支持transform属性
  position: absolute;
  inline-> inline-block

- css选择器 优先级按 个十百千
从小到大安排element->class->id->inline
!import 最高，不要乱用
  - 个：行内样式
  - 十：id选择器
  - 百：类选择器 伪类选择器
  - 千：元素选择器 伪元素选择器