import {useState} from 'react';
export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    addTodo(text.trim());
    setText('');
  }
  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input  
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </form>
  )
}