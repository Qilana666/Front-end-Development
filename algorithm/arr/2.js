const arr = (new Array(6)).fill(0);
const len = arr.length;// 对象的属性 开销的
// 计数循环 cpu 工作很契合
// 遍历数组方法千千万， 计数循环性能最好
// for (let i = 0; i < arr.length; i++) {
for (let i = 0; i < len; i++) {  
  console.log(arr[i]);
}
  