function foo() {
  var a = { name: '极客时间' }  // 复杂数据类型 引用式赋值  拷贝引用地址
  var b = a;   //引用式拷贝
  a.name = '极客邦'
  console.log(a); // 极客邦
  console.log(b); // 极客邦
}
foo();