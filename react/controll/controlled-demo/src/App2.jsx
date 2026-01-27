import {
  useState,
  useRef
} from 'react';
export default function App() {
  // 受控组件 组件里有被状态控制的表单元素
  // 单向数据流 单向绑定
  // 状态绑定输入框  输入框被状态控制了
  // 状态控制 输入框的值 很牛掰的
  const [value, setValue] = useState("")
  const inputRef = useRef(null);
  const doLogin = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value)
  }
  return (
    <form onSubmit={doLogin}>
      {value}
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} />
      <input type="text" ref={inputRef}/>
      <button type="submit">登录</button>
    </form>
  )
}