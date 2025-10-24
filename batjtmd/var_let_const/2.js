//会有歧义？
//在大型语音里面 变量应该先声明再使用
console.log(age);//undefined   ReferenceError: Cannot access 'height' before initialization
var age; //声明 undefined 
age = 18; //赋值
//JS 脚本语言，它的编译阶段和执行阶段不像java/c++一样分开的那么清晰
//编译阶段有，就在代码执行前的一刹那，var 就变量提升了
// 接下来代码进入到执行阶段 赋值发生在执行阶段
//变量提示不利于代码的可读性，应该废弃的糟粕
// console.log(height);
//暂时性死区
//在编译阶段的变量提升是为了编译阶段就知道有哪些变量和常量
// let/const+暂时性死区 解决了变量提升的问题
console.log(PI);
let height = 188;