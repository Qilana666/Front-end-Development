//js 中函数是一等公民，编译阶段就会进行函数提升
//和var 相同的地方是都会提升，不同的地方在于var 只会提升变量声明，
// 而函数不止提升声明，连赋值也一起提升
setWidth();
//全局作用域
function setWidth() {
  // 函数作用域 局部
  var width = 100;
  // {
  //   // 块级作用域
  //   let a = 1;
  // }

  // console.log(a);//ReferenceError: a is not defined
  console.log(width);
}
// console.log(width);
