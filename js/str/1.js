//坚持一种风格，遵守公司的代码风格
let str = "hello world";
let str2 = 'hello world';
//es6的模板字符串
//其他大型语言都有字符串模版功能，js 不再去拼接
let w = 'world';
let str4 = "hello "+w;//es5
let str3 = `hello ${w}`;//es6
//String (包装)类 string 类型
//字符串对象
let str5 = new String("abc");//注意：这会生成对象类型，而非原始字符串类型
console.log(
  str5,
  str5.valueOf(),
  typeof str4,
  typeof str5,
  Object.prototype.toString.call(str5)
);
//为什么简单数据类型会有length属性
//因为简单数据类型是不可变的，而length属性是用来表示字符串的长度的，所以简单数据类型也有length属性
console.log(str4.length,str5.length);
