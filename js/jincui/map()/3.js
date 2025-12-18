const prices = [4, 8, 15, 16, 23, 42] 

// const discountPrices = []
//通常只需要当前值
// prices.map((price, i, arr) => {
//   discountPrices.push(price*0.5)
// })

// const discountPrices =prices.map((price) => {
//   return price * 0.5
// //迭代 用返回值替换当前值 填到数组discountPrices中
// })

const discountPrices = prices.map(price => price * 0.5)
console.log(prices)
console.log(discountPrices)