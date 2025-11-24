const s1 = Symbol('二哈');
// Symbol：是一个数据类型，同时也是一个函数。
// Symbol('二哈')：是一个函数调用表达式。执行它会创建并返回一个 **Symbol类型的具体值 **。
const s2 = Symbol('二哈');
console.log(s1 == s2);  //false
const secretKey = Symbol('secret');
console.log(secretKey,'////');   //Symbol(secret) ////

//多人协作中 ，不同人定义的 Symbol 是不会冲突的

//声明一个对象（可以修改，也可以添加新的属性）
//js是门动态的语言， 不太安全
const a = "ecut";
const user = {
  [secretKey]: '123456',
  //[secretKey]  是key string类型 | symbol类型
  email:'1234567890@qq.com',
  name: '王大帅',
  // 两种写法都可以
  "a": 456,  //把a的值作为key
  [a]:123
}
console.log(user.ecut,user[a]) //123 123
console.log(user.a);  //456
console.log(user[secretKey]);  //123456
user.email = 'wang@163.com'
console.log(secretKey);//Symbol(secret)