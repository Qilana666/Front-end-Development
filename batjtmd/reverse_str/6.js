//求和
const arr = [1, 2, 3, 4, 5, 6];
//reducer函数
//第一个参数是累加器(之前的计算结果)，第二个参数是当前值
const total = arr.reduce((accumulator, currentValue) => {
    console.log(accumulator, currentValue);
    return accumulator + currentValue;

}, 0);
console.log(total);
// 0 1
// 1 2
// 3 3
// 6 4
// 10 5
// 15 6
// 21