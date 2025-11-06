let str = 'hello';
let str2 = str;//值的拷贝
str2 = '你好';
console.log(str,str2);
console.log(str.length);

let obj = {//复杂数据类型 对象
  name:'王老板',
  age:18
}
let obj2 = obj;//引用式的拷贝
obj2.age++;
console.log(obj, obj2);
//变量申请内存空间
// 简单数据类型 内存空间   栈内存  把值给你
// 复杂数据类型 内存空间   堆内存  把引用地址给你