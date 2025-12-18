import {
  useState 
} from 'react';
// 用户做什么（Event）→ 改数据（State）→ 界面跟着变（View）
export default function App() {
  // 数据 -> setNum   变成另一个数据  值不是固定的了，这就是状态state
  //hook函数  useState  为程序带来了关键的响应式状态
  // **状态是变化的数据**，组件的核心是状态
  //1 数据  也是状态的初始值
  // const [num, setNum] = useState(1)  // 定义一个状态变量num，初始值为1
  const [num, setNum] = useState(() => {
    //初始值比较复杂的时候 需要通过复杂计算得到 用箭头函数（**同步函数**）来计算
    // **同步函数**，不支持异步，异步可能不确定，但同步函数的状态一定是确定的，肯定是初始值
    // 纯函数是指相同的输入始终返回相同的输出，且无副作用的函数（（不修改外部变量、不发网络请求、不操作 DOM 等））
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  }) 
  return (
    // 事件绑定
    // <div onClick={()=>setNum(num+1)}>
    //修改函数中可以直接传新的值，也可以传入一个函数，并且这个函数的参数是上一次的state值
    <div onClick={() => setNum((prevNum) => {
      console.log(prevNum);
      return prevNum + 1
    })}>
      {num}
    </div>
  )
}