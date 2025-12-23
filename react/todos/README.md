# React Todos

- react+stylus+vite
- 父子组件通信
- 子父组件通信 通过父组件传递的自定义事件上报修改
- 兄弟组件 **通信**
  间接的 ，通过父组件 + 响应式
  TodoInput TodoList TodoStats
  todos[] useState
  父组件负责持有数据 管理数据 统一 正确
  props 传递给子组件
  父组件还可以将修改数据的方法传给子组件
  子组件不可以直接修改数据 只能通过父组件
  传递的方法来修改数据。提交修改的请求
