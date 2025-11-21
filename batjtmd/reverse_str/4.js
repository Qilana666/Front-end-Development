function reverseStr(str) {
    let reversed = '';//字符从空开始
    //把字符串想象成字符数组
    for (const char of str) {
        reversed = char + reversed;//拿出来的字符放在反转过的字符前面
    }
    return reversed;
}
console.log(reverseStr('hello'))