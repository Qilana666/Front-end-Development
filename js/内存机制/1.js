//调用栈机制在栈内存中 
//体积小
function foo() {
  var a = 1;
  var b = a;// 简单数据类型 赋值操作 拷贝值
  a = 2;
  console.log(a); // 2
  console.log(b); // 1
}
foo();