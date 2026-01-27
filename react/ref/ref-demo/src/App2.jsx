import {
  useState,
  useRef,
  useEffect
} from 'react';

export default function App() {
  const [count, setCount] = useState(0); // 响应式状态
  
  console.log('变了~~~~~~');
  const inputRef = useRef(null);// 初始值为空
  console.log(inputRef.current);
  useEffect(() => {
    console.log(inputRef.current)
    inputRef.current.focus()
  }, [])
  // 自动聚焦
  return (
    <>
      <input ref={inputRef}/>
      {count}
      <button type="button" onClick={() => setCount(count+1)}>count ++ </button>
    </>
  )
}