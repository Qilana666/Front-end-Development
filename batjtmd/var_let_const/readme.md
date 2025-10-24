# var_let_const

- js 里面如何声明变量
- var 声明变量
  bad 和直觉不符合
  var 声明的变量 var a=1;
  var a;在代码一开始就可以访问 **变量提升** 编译阶段（检测语法错误）就这样
  执行阶段
  a=1;
  let 声明变量

- js 里面如何声明常量
  const 声明常量

## 报错的集合

- ReferenceError: Cannot access 'height' before initialization
  提前访问暂时性死区（Dead Zone）的变量
- ReferenceError: age is not defined
  作用域外调用
- TypeError: Assignment to constant variable.

- leetcode hot 100 6-10 题
- 你不知道的 javascript 1-2 章 写一篇学习笔记文章
- var-let-const 总结
