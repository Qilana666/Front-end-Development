const arr = [1, 2, 3, 4, 5, 6];
// es6 提供的新方法
// 可读性好
// 计数循环 可读性差  i = 0, i<;i++ 死板
for (let item of arr) {
    console.log(item);
}