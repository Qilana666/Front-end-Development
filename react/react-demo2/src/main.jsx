// 严格模式，执行两次，一次是执行，一次是测试，review
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//vite 帮我们编译stylus为css
import './index.styl' //全局样式 将.css改为.styl npm install -D stylus
import App from './App.jsx'  //引入了组件

// 将App组件挂载到root元素上 渲染（render）
createRoot(document.getElementById('root')).render(
  // <StrictMode>
     <App />, //jsx   函数组件的名字，类html标签 自定义组件
  // </StrictMode>,

)
