# React Hooks

以 use 开头的函数，都是 React Hooks

- react api 最新的语法
- 函数 react 风格比较原生 js

## react 内置的

- useState

  - 初始化时传入一个纯函数
    如果我想在初始化时异步请求数据怎么办？
  - setState 也可以传入一个函数，函数的参数是上一次的 state 值

- useEffect 副作用
- 对立面是纯函数
  组件来说输入参数，输出 jsx
  useEffect 异步请求数据，并修改状态
- 请求数据 副作用
- 第二个参数[] 是依赖项（数组）
- 三种情况
  - onMounted 挂载时一定执行 [] 只执行一次
  - 根据依赖项， [state,state2] 更新
  - return 函数，这个函数是一个闭包， 在下一次执行 effect 前调用，或 组件卸载前调用
  - 不依赖项 [] 只执行一次

## 自定义的
