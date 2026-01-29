// 强类型可以杜绝90%的错误
function addTs(a, b) {
    return a + b;
}
var result2 = addTs(10, 5);
console.log(result2);
// const result3 = addTs(10, "5");  // 类型“string”的参数不能赋给类型“number”的参数。
