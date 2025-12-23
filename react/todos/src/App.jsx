import {
  useState,
  useEffect,
} from 'react'
import './styles/app.styl'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import TodoStats from './components/TodoStats'

function App() {
  //子组件共享的数据状态
  const [todos, setTodos] = useState(() => {
    // 高级用法
    const saved=localStorage.getItem('todos')
    return saved?JSON.parse(saved):[]
  })
  //子组件修改数据的方法
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),   //时间戳，唯一值
      text,
      completed: false, 
    }])
    // 保存到localStorage
    localStorage.setItem('todos',JSON.stringify([...todos, {
      id: Date.now(),   //时间戳，唯一值
      text,
      completed: false, 
    }]))
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  } //删除指定id的todo
  //计算未完成的todo数量
  const activeCount = todos.filter(todo => !todo.completed).length
  //计算已完成的todo数量
  const completedCount = todos.filter(todo => todo.completed).length
  //切换todo的completed状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed,
    } : todo))
  }

  //清除所有已完成的todo
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  // 监听todos变化，保存到localStorage
//   useEffect 如何监听状态（state）的变化？
// 把你想监听的状态变量放进 useEffect 的依赖数组 [ ] 里，
// 当这个状态改变时，useEffect 里的代码就会自动执行。
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));    
  },[todos])
  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      {/* 里面不需要写东西，自闭合 */}
      {/* 自定义事件 */}
      <TodoInput onAdd={addTodo} />    
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onClearCompleted={clearCompleted}
      />
      <TodoStats
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}

export default App