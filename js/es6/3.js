// js 不适合做大量的运算
// 精度丢失  2^53 -1    64位
// 第一位 符号位 11位 指数 52 位
let num = 1234567890987654321n;
console.log(num, typeof num);
// console.log(Number.MAX_SAFE_INTEGER);
// 指数运算符 es7 
console.log(2 ** 10);