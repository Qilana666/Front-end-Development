import {
  Suspense,
  lazy
} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout';


const Home = lazy(() => import('@/pages/Home'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Order = lazy(() => import('@/pages/Order'));
const Chat = lazy(() => import('@/pages/Chat'));

export default function RouterConfig({children}: {children?: React.ReactNode}) {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/login" element={<Login />}/>
          {/* 布局组件 */}
          <Route path="/" element={<MainLayout/>}>
            <Route path="" element={<Home />} />
            <Route path="mine" element={<Mine />} />
            <Route path="order" element={<Order />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Suspense>
      {children}
    </Router>
  )
}