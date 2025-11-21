// 反转字符串 abc  cba
function reverseStr(str) {
    //字符串split 切割字符串
    //数组可以反转
    //数组join 拼接字符串
    return str.split('').reverse().join('')
}
console.log(reverseStr('hello'));