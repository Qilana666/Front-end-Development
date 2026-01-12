/\*\*

- @param {character[]} s
- @return {void} Do not return anything, modify s in-place instead.
  \*/
  <!-- 解构赋值 [a, b] = [b, a] 在 JS 中虽然简洁，但性能比直接交换差一点，因为它涉及临时对象创建和多个步骤 -->
  <!-- 为什么双指针法可能“跑得慢”？

1. JavaScript 的运行机制
   JS 是解释型语言，运行在 V8 引擎中，虽然优化很好，但相比编译型语言（如 C++）仍然有性能差距。
   数组操作（特别是 s[left] = s[right] 这类）在 JS 中会有一定的开销。
2. LeetCode 的评测环境差异
   不同语言的测试机配置不同；
   JS 的测试用例可能被设计成对字符串处理敏感；
   某些 JS 实现（比如使用 reverse() 方法）反而更快，因为它是内置方法，底层用 C++ 写的。 -->

<!-- 双指针法 -->
<!-- 3.5ms 击败19.38% -->

var reverseString = function(s) {
let left = 0;
let right = s.length - 1;
while (left < right) {
[s[left], s[right]] = [s[right], s[left]];
left++;
right--;
}
};

<!--  -->
<!-- 1ms 击败77.53% -->

var reverseString = function(s) {
let left = 0;
let right = s.length - 1;
while (left < right) {
const temp = s[left];
s[left] = s[right];
s[right] = temp;
left++;
right--;
}
};

<!-- 内置api -->
<!-- 0ms 击败100% -->

var reverseString = function(s) {
s.reverse();
};
