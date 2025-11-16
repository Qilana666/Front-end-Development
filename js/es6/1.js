// 如何一次性申明多个变量
// let a = 1,
//   b = 2,
//   c = 3;
// 数组解构赋值
// es6 为了优雅而来
// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c);
// 非一围，嵌套数组
// const arr = [1, [2, 3, [4], 5]];
// const [a, [b, c, [d], e]] = arr;
// console.log(a, b, c , d, e);

const arr = [1, 2, 3, 4, 5];
// arr[0] a
// 余下的 数组， b 
// reset 运算符
// const [a, ...b] = arr
// console.log(a, b);

const users = ['Darvin Ham', 'James', 'Luka', 'Davis', 'Ayton', '田田'];
// 左右一致
const [captain, ...players] = users;
console.log(captain, players);

const sex = 'boy'; // 常量
const obj = {
    name: '刘翔平',
    age: 18,
    // 'sex': sex
    // es6 的对象属性简写语法(Shorthand Property)
    sex,
    like: {
        n: '唱跳'
    }
}
// let name = obj.name;
// 一次性的结构一个对象
// 只要左右两边一样，[], {} 都能解开
// 嵌套
let { name, age, like: { n } } = obj;
console.log(name, age, n);
const [a, b, ...c] = 'hello';
console.log(a, b, c);
// const str = 'hello';
// console.log(str.length);
// length
// 包装类
const { length } = 'hello';// 长度
console.log(length);
