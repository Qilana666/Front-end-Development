// forEach
const arr = [1, 2, 3, 4, 5, 6];
// 不能break 
// 函数入栈出栈 性能差
// 使用 for...of 替代 forEach，支持 break
for (let [index, item] of arr.entries()) {
  if (item === 3) {
    break;
  }
  console.log(item, index);
}