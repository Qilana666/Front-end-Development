import {
  useState,
  useCallback,
  memo
} from 'react';

// function Child() {
//   console.log('child 重新渲染');
//   return (
//     <div>
//       子组件
//     </div>
//   )
// }
// 高阶组件
// 参数是一个组件，返回值是一个新的组件
const Child = memo(({count,handleClick}) => {  //解构
  console.log('child 重新渲染');
  return (
    <div onClick={handleClick}>
      子组件{count}
    </div>
  )
})

export default function App() {
  // 父组件负责持有数据和管理数据 
  // 某一个数据改变， 只想让相关的子组件重新渲染
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  //父组件要将函数传递给子组件
  //handleClick每次都会是一个新函数
  // 但是父子组件通信传递函数常态，缓存函数  usecallback
  // const handleClick = () => {
  //   console.log('click');
  // }
  const handleClick = useCallback(() => {
    console.log('click');
  }, [count])
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>count+ 1</button>
      {num}
      <button onClick={() => setNum(num + 1)}>num+ 1</button>
      {/* 子组件 */}
      <Child count={count} handleClick={handleClick} />
    </div>
  )
}