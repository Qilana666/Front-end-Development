import {
  BrowserRouter as Router, //html5 和后端路由是一样的 纯 现代  低端浏览器不支持
  // HashRouter as Router, //#路由形式之一  as 别名  有点丑  #早期使用???
  Link , // 路由跳转组件 ,不能用a标签了  用Link组件替代，内部消化
} from 'react-router-dom'
import './App.css'
import AppRoutes from './router/index'

function App() {

  return (
    <Router>
      {/* 路由接管一起 */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <AppRoutes/>
    </Router>
  )
}

export default App
