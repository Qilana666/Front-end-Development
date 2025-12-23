const TodoList = (props) => {
  const {
    todos,
    onDelete,
    onToggle, //切换todo的completed状态
  } = props;
  return (
    <ul className="todo-list">
      {
        todos.length === 0 ? (
          <li className="empty">No todos yet！</li>
        ) : (
            todos.map(todo => (
              <li
                key={todo.id}
                className={todo.completed ? 'completed' : ''}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=>onToggle(todo.id)}
                  />
                  <span>
                    {todo.text}
                  </span>
                </label>
                <button onClick={()=>onDelete(todo.id)}>❌</button>
              </li>
            ))
        )
      }
    </ul>
  )
}

export default TodoList