const PI = 3.1415926;
const person = {
  name:"王老板",
  age:18
}
person.age = 20;
console.log(person);
// 简单数据类型的常量不能改变的
// 复杂数据类型的常量，不能改变引用地址，但是可以改变？引用地址？中的属性值
//如果对象一定不能变呢？
const wes = Object.freeze(person);//冻结对象
console.log(wes);
wes.age = 16;
console.log(wes);