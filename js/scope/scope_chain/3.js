//特殊的地方
function foo() {
  var myName = "极客时间"
  let test1 = 1
  const test2 = 2
  var innerBar = {//var不支持块级作用域
    // 键值对
    getName: function () {
      console.log(test1)//没有声明变量，无词法和变量环境
      return myName
    },
    setName: function (newName) {
      myName = newName
    }
  }
  //return 可以被外部访问
  return innerBar  //闭包形成的条件是函数嵌套函数
}
var bar = foo() //执行20行的时候，foo（）出栈，bar 里面的变量要垃圾回收吧？ 不会回收
bar.setName('极客邦')//setName 执行上下文创建
bar.getName()
console.log(bar.getName())

