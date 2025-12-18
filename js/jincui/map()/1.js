const prices = [4, 8, 15, 16, 23, 42] 

// 覆盖原数组的数据
prices.forEach((price, i, arr) => {
  arr[i]=price*0.5
})
console.log(prices)

