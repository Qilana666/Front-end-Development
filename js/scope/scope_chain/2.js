function bar() {
  var myName = "极客世界";
  let test1 = 100;
  if (1) {
    let myName = "Chrome 浏览器"
    console.log(test)
    // 块级作用域支持词法环境
    // 词法环境没找到去变量环境
  }
}
function foo() {
  var myName = "极客邦";
  let test = 2;
  {
    let test = 3;
    bar()
  }
}
var myName = "极客时间";
let myAge = 10;
let test = 1;
foo();