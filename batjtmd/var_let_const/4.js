{//块级作用域
  var age = 18;//不支持块级作用域
  let height = 188;//'支持块级作用域 是大型项目或高级语言的核心
}

console.log(age);//会打印18
console.log(height);//会报错 ReferenceError: height is not defined