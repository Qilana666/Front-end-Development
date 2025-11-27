//详见1js.png  (不是一开始，全局执行完的时候)
function bar() {
  console.log(myName)
}
function foo() {
  var myName = '极客邦'
  bar()
}
var myName = '极客时间'
foo();