const prices = [4, 8, 15, 16, 23, 42] 

//创建新数组
//问题是需要手动管理，创建新数组，每次将新值推入其中，不是真的使用映射
const discountPrices=[]
prices.forEach((price, i, arr) => {
  discountPrices.push(price*0.5)
})
console.log(discountPrices)