import {
  useState, //响应式状态
  useEffect //副作用
} from 'react';

import Demo from './components/Demo.jsx'

async function queryData() {
  const data=await new Promise(resolve=>{
    setTimeout(()=>{
      resolve((666))  
    },1000)
  })
  return data
}

export default function App() {
  const [num, setNum] = useState(0)
  // console.log('yyy');  //主业，不管放哪，先执行

  // //请求时副作用
  // useEffect(() => {
  //   //挂载时执行，onMounted
  //   console.log('xxx');
  //   // 挂载后执行，vue生命周期 onMounted
  //   queryData().then(data => {
  //     setNum(data);  
  //   })
  // }, []) //[]空数组 依赖项为空，我谁也不依赖，只执行一次钩子函数zhizhiixn只在组件挂载时执行一次
  // useEffect(() => {
  //   //挂载时执行，onMounted
  //   //更新时执行 Updated   依赖num，num变，就会执行
  //   console.log('zzz');  
  //   // 挂载后执行，vue生命周期 onMounted
  // }, [num]) 
  //   useEffect(() => {
  //   //挂载时执行，onMounted
  //   //更新时执行 Updated   依赖num，num变，就会执行
  //   console.log('zzz');  
  //   // 挂载后执行，vue生命周期 onMounted
  //   }, [1, 2, 3, new Date()])
  
  // 如果不传依赖项， 渲染后和状态更新时都会执行
  // useEffect(() => {
  //   console.log('ddd');  
  // })

  useEffect(() => {
    console.log('effect');  
    //每次都在新建定时器   
     //定时副作用
    const timer=setInterval(()=>{ 
     console.log(num);  
    }, 1000)  

    
    return () => {
      //重新执行effect时，会先清除上一次的定时器
      //不清除，导致内存泄漏
      // useEffect return 函数
      console.log('remove');
      clearInterval(timer);
    }
  }, [num]);
 

  return (
    <>
      <div onClick={() => setNum(prevNum => prevNum+1)}>
      {num}
      </div>
      {num%2===0&&<Demo/>}  
    </>
    
  )
}