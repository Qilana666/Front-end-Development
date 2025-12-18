// function add(nums) {
//   nums.push(3);  //会影响外界数组的值 ，不是纯函数
//   return nums.reduce((pre, cur) => pre + cur, 0)
// }

const add = function (x, y) {
  fetch //异步不确定的
  return x + y;
}
const nums = [1, 2];
add(nums); //副作用，修改了nums数组 ，值不确定
console.log(nums.length)