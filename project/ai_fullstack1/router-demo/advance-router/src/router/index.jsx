import {
  lazy, //懒加载
  Suspense, //  Suspense 组件 用于包裹懒加载的组件
} from 'react'

import {
  Navigate, // 路由跳转
  Routes, // 一组路由
  Route, // 单个路由
} from 'react-router-dom'


import LoadingFallback from '../components/LoadingFallback'
// 懒加载  为啥首页也需要懒加载？如果是从别人分享链接进来，刚进来时可能不在首页
// import Home from './pages/Home'
const Home = lazy(() => import('../pages/Home'))
// import About from './pages/About'
const About = lazy(() => import('../pages/About')) 
const UserProfile = lazy(() => import('../pages/UserProfile')) 
const Product=lazy(()=>import('../pages/product'))
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'))
const NewProduct = lazy(() => import('../pages/product/NewProduct'))
const Login = lazy(() => import('../pages/Login'))
const Pay = lazy(() => import('../pages/Pay'))
const ProtectRoute = lazy(() => import('../components/ProtectRoute'))
const NotFound = lazy(() => import('../pages/NotFound'))
const NewPath = lazy(() => import('../pages/NewPath'))

export default function RouterConfig() {
  return (
    <Suspense fallback={<LoadingFallback />}>      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> 
          {/* 动态路由  http(s)://www.juejin.cn/user/12345?keyword=23#/about
              协议：//domain/path/:params?querySttring
          */}
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/old-path" element={<Navigate replace to="/new-path" />} />
          <Route path="/new-path" element={<NewPath/>} />
          {/* 鉴权的路由 */}
          <Route path="/pay" element={
            <ProtectRoute>
              <Pay />
            </ProtectRoute>
            } />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
  )
}