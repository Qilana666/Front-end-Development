import {
  Routes, // 大写R 是个类  前端的路由总管 ， 只有一个
  Route  // 具体的路由实例
} from 'react-router-dom'
import Home from '../pages/Home'; //首页
import About from '../pages/About'; //关于页

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      {/* 什么是占位符？ */}
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
