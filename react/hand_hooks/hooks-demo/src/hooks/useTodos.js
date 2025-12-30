// 封装响应式todos业务


import {
  useState, 
  useEffect
} from 'react';

const STORAGE_KEY = 'todos';  //声明常量，好维护

function loadFromStorage() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = storedTodos ? JSON.parse(storedTodos) : [];
    // Validate that we have an array of todo objects
    if (Array.isArray(parsed) && parsed.every(item => 
      typeof item === 'object' && 
      item !== null && 
      typeof item.id === 'number' && 
      typeof item.text === 'string' && 
      typeof item.completed === 'boolean'
    )) {
      return parsed;
    }
    // Clear invalid data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
export const useTodos = () => {
  // useState 接受函数 计算， 同步
  const [todos, setTodos] = useState(loadFromStorage);
  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  const addTodo=(text)=>{
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false
      }]);
  }

 const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    )
  }
  
const deleteTodo = (id) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }
  
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}