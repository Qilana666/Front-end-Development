import {
  useEffect,
  useRef,  // 默默奉献存储能力
  useState // 响应
} from 'react';

export default function App() {
  let intervalId = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(intervalId.current)
  }, [count])

  function start() {
   intervalId.current =  setInterval(() => {
      console.log('tick～～～～');
    }, 1000)
    console.log(intervalId);
  }

  function stop() {
    clearInterval(intervalId.current);
  }

  return (
    <>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
      {count}
      <button type="button" onClick={() => setCount(count+1)}>count ++ </button>
    </>
  )
}