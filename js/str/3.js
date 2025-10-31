const todos = [
  {
    id: 1,
    text: '学习es6'
  },
  {
    id: 2,
    text: '通读你不知道的JavaScript'
  }
];
console.log(todos.map(function(todo){
  // console.log(todo);
  return `<li>${todo.text}</li>`
}))
//es6的箭头函数
//如果只有一个参数，可以省略括号
//如果只有一条语句，且是返回值，可以省略花括号{}
console.log(todos.map(todo=>`<li>${todo.text}</li>`))