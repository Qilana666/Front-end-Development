import TodoItem from './TodoItem.jsx';
export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo
}) {
  return (
    <ul className="todo_list">
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))
      }
    </ul>
  )
}