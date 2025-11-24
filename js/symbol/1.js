//Symbol是构造函数，却是简单数据类型

// const id1 = Symbol('');
// const id2 = Symbol('');
// console.log(id1 === id2);   //false
//  Symbol('') 虽然描述符为空，但它依然遵循 Symbol 的唯一性规则


const id1 = Symbol('二狗');
// Symbol 是一个函数（也是一个构造函数，但有特殊行为）
// 当你写下 Symbol('二哈') 时，你并不是在使用类型本身，而是在调用一个函数。这个函数的作用是创建并返回一个 Symbol 类型的新实例。
console.log(typeof id1);
const id2 = Symbol('二哈');
console.log(id1 === id2);
