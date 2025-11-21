//递归 算法策略 不是算法
//函数自己调用自己
//大的问题，交给小（类似）的问题 整个子字符串反转
// hello  ello 完成了反转 h放在后面， 最后把整个字符串反转

function reverseStr(str) {
    //退出条件
    if (str === "") {//空字符串
        return "";
    } else {
        //第二个字符到最后
        //每次第一个拿出来的字符放后面去
        return reverseStr(str.substr(1)) + str.charAt(0);
    }
    // reverseStr(str[0..str.length - 2] + str[0])
}
console.log(reverseStr('hello'));