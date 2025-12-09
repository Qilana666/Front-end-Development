// js 是动态弱类型语言
var bar; //undefined  动态的  调用栈执行上下文里顺手就存了 内存小，也开了一块空间
console.log(typeof bar); //undefined
bar = 12; //number 
console.log(typeof bar); //number
bar = "极客时间"; //string
console.log(typeof bar); //string
bar = true; //boolean
console.log(typeof bar); //boolean
bar = null; //null  
console.log(typeof bar); //object  js设计的bug 
bar = { name: "极客时间" };
//Object.prototype.toString.call()  
console.log(typeof bar); //object
