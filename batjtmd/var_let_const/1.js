//早期的JS 就用来页面交互，有一些缺失甚至不合理的地方
//语言精粹，The Good Parts,The Bad Parts
//es5 只有var 声明变量，没有常量
var age = 18; //js弱类型，由值决定
age++;
var PI = 3.1415926;//变量大写，约定就不应该改变  编程习惯
console.log(age);
PI = 3.15;
//es6 2015年 js 像java c++ 大型语言，企业级开发项目
//建议不要再用var了，直接上let
let height = 188;
height++;
console.log(height);
const key = 'abc123';
key = 'abc234';