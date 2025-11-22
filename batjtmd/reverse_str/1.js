// 反转字符串 abc  cba
function reverseStr(str) {
    //字符串split 切割字符串
    //数组可以反转
    //数组join 拼接字符串
    return str.split('').reverse().join('')
    //1.split('') 切割字符串 返回数组
    //2.reverse() 反转数组**作用于数组**
    //3.join('') 拼接字符串 返回字符串
}
console.log(reverseStr('hello'));