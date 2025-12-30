import {
  useState,
  useEffect
} from 'react';
import { useMouse } from './hooks/useMouse.js';
import { useTodos } from './hooks/useTodos.js';
import TodoList from './components/TodoList.jsx';
import TodoInput from './components/TodoInput.jsx';
import TodoItem from './components/TodoItem.jsx';

// function MouseMove() {
//   const { x, y } = useMouse();
//   return (
//     <>
//       <div>
//         鼠标位置：{x} {y}
//       </div>
//     </>
//   )
// }

export default function App() {
  // const [count, setCount] = useState(0);
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  return (
    <>
      <TodoInput addTodo={addTodo} />
      { 
        todos.length > 0 ? (<TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo} />) : <div >暂无待办事项</div>
      }
      {/* {count}
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      {count % 2 === 0 && <MouseMove /> } */}
    </>
  )
}