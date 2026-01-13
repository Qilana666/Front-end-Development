/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
`要点`
  从右往左逐位相加，
  用 carry 处理进位，
  个位存数组，最后反转拼接。
`思考`
1.为什么从右往左逐位相加
2.为什么越界时当作 0
3.为什么要 carry !== 0
4.% 10 和 / 10 各自的意义
5.为什么要反转数组

  
var addStrings = function(num1, num2) {
    // i 指向 num1 的最后一位（个位）
    let i = num1.length - 1;
    // j 指向 num2 的最后一位（个位）
    let j = num2.length - 1;

    // carry 用来保存进位，初始为 0
    let carry = 0;

    // 用数组保存结果的每一位（注意：是倒序保存）
    let res = [];

    // 只要 num1 还有位，或 num2 还有位，或还有进位，就继续计算
    while (i >= 0 || j >= 0 || carry !== 0) {
        // 如果 i 还没越界，就取 num1 当前位数字，否则当作 0
        let x = i >= 0 ? num1[i] - '0' : 0;
        // 如果 j 还没越界，就取 num2 当前位数字，否则当作 0
        let y = j >= 0 ? num2[j] - '0' : 0;

        // 当前位的和 = num1 当前位 + num2 当前位 + 进位
        let sum = x + y + carry;

        // 当前位结果是个位数（对 10 取余）
        res.push(sum % 10);

        // 更新进位（十位上的数）
        carry = Math.floor(sum / 10);

        // 指针向左移动，处理更高一位
        i--;
        j--;
    }

    // 因为结果是从个位开始存的，需要反转后再拼成字符串
    return res.reverse().join('');
};
