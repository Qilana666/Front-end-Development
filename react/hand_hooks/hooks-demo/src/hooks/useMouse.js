//封装响应式的mouse业务
//UI组件更简单 html+css,可读性好，维护性好
//复用  和组件一样，是前度团队的核心资产
import {
  useState,
  useEffect
} from 'react';
export const useMouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  useEffect(() => {
    const update = (event) => {
      console.log('///////触发')
      setX(event.pageX);
      setY(event.pageY);
    }
    window.addEventListener('mousemove', update);
    // 组件卸载时，清除事件监听
    console.log('||||||');
    return () => {
      console.log('|||||| 清除');
      window.removeEventListener('mousemove', update);
    }
  }, [])
  // Hooks 的返回值，就是你在组件里“能用的东西”
  // 通过 return，它们被传递到调用它的组件（App）的作用域中
  // 把要向外暴露的状态和方法返回
  return {
    x,
    y
  }
}