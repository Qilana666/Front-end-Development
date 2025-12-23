import {useState} from 'react'
const TodoInput = (props) => {
  // console.log(props)
  const { onAdd } = props
  //react 不支持v-model那样的双向绑定 性能不好
  //react 只支持单向绑定 性能好   +     onchange 实现数据和视图的同步
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();   //阻止表单默认提交事件
    onAdd(inputValue)
    setInputValue('')
  }
  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={e=>setInputValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoInput