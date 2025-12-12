// 根组件
// 返回的是个jsx就是个组件
// 组件树
// ？函数来做组件树   将jsx+逻辑封装成了一个组件
// 组件是由js/css/html 组合起来，完成一个相对独立的功能
// jsx负责UI
//state 数据状态 ref
import { useState, createElement } from 'react'
import './App.css'
function App() {
  // const name = "vue"
  // 状态变量 name  状态更新函数 setName
  //数组的第一个元素是状态值，第二个元素是更新状态值的函数
  // 我要在组件里存一个叫 name 的变量，初始值是 'vue'；以后想改它，就用 setName 这个方法
  const [name, setName] = useState("vue");
  const [todos, setTodos] = useState([{
    id: 1,
    title: "学习react",
    completed: false,
  }, {
    id: 2,
    title: "学习node",
    completed: false,
  }])
  const [isLoggedIn, setIsLoggedIn] = useState(false); //解构
  setTimeout(() => {
    setName("react");
  }, 3000)
  // 组件的数据业务、交互等
  //jsx js里面，class是js关键字，不能用，用className
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  }
  // 语法糖，主要是简化模版开发，提升代码的可读性 完全是在js里面写html
  const element = <h2>JSX是react中用于描述用户界面的语法扩展</h2>
  //react 提供了createElement 方法来创建元素
  // const element2 = React.createElement("h2", null, "JSX是react中用于描述用户界面的语法扩展")
  return (
    // 文档碎片标签
    <>
      {element}
      {/* {element2} */}
      <h1>Hello <span className="title">{name}!</span></h1>
      {/* 站位符 一个{}是react 两个{{}}是vue */}
      {
        todos.length > 0 ? (<ul>
          { //原生js react 风格是 能不用新语法就不用
            //xml in js 
            todos.map((todo) => (
              <li key={todo.id}>
                {todo.title}
              </li>
            ))
          }
        </ul>
        ) : (<div>暂无待办事项</div>)
      }
      {isLoggedIn ? <div>已登录</div> : <div>未登录</div>}
      {/* 非常的像原生js，但是要驼峰式命名 */}
      {/* onClick 点击事件 切换登录状态 */}
      <button onClick={toggleLogin}>
        {isLoggedIn ? "退出登录" : "登录"}
      </button>
    </>

  )
}
export default App 
