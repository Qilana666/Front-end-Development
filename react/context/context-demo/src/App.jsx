import {
  // useContext, //hooks
  createContext
} from 'react';
import Page from './views/Page.jsx';
//跨层级通信数据状态的容器
// 直接export 可以多次
export const UserContext = createContext(null);  //实例化一个数据容器
//1次
export default function App() {
  const user = { name: 'Andrew' };  //父组件持有数据 
  return (
    // context提供给Page  组件树共享  数据容器
    // Provider 组件 数据提供者 
    // provider有个value  context  里面的值
    // 把 user 放到上下文里
    
    // UserContext.Provider value={user}？  是把user 放到上下文里
    <UserContext.Provider value={user}>  
      <Page/>
    </UserContext.Provider>
  )
}