import {
  useEffect
} from 'react';
export default function Demo() {
  useEffect(() => {
    console.log('123123');  //onMounted（挂载） 的时候执行  ？？？
    const timer=setInterval(()=>{ 
      console.log(timer);  
    }, 1000)  
    //生命周期函数 onMounted（挂载）  ->  onUpdated（更新）  ->  onunMounted(卸载)
    // 卸载时执行
    return () => {  //卸载前执行回收
      console.log('remove');
      clearInterval(timer);
    }
  },[])
  return (
    <div>
      偶数Demo
    </div>
  )
}