//null 和undefined
//undefined：变量声明了但没赋值，类型无法确定
// 或对象属性/数组元素不存在，JS自动给undefined
//JS是弱类型语言
let a;
console.log(a, typeof a);
let obj = {
  name:'mm'
}
console.log(obj.girlFriend);
a = 1;//变量的类型由值决定
console.log(typeof a);

//null 表示一个空值 不是未定义  有概念的
//有值
// 主动赋值给变量，表示这个值是空的
let b = '原有的值';
b = null;
