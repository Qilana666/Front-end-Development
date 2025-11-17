const obj = {
    name: "黄国文",
    age: 18,
    hobbies: ["篮球", "足球", "跑步"]
}
// 设计来迭代对象的属性的
for (let k in obj) {
    console.log(k, obj[k]);
}
//数组也是对象，把数组看待成下标为key的可迭代对象
const arr = [1, 2, 3, 4, 5, 6];
// key是下标
for (let key in arr) {
    console.log(key, arr[key]);
}