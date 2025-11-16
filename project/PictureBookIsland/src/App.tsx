import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd-mobile'
import { Toaster } from 'sonner'
import zhCN from 'antd-mobile/es/locales/zh-CN'

// Layout
import LayoutComponent from './routes/_layout'

// Pages
import HomePage from './routes/index'
import BooksPage from './routes/books'
import BookDetailPage from './routes/books/$id'
import ActivitiesPage from './routes/activities'
import ReadingPage from './routes/reading'
import ProfilePage from './routes/profile'
import LoginPage from './routes/login'
import ShoppingCartPage from './routes/shopping-cart'
import CheckoutPage from './routes/checkout'
import OrdersPage from './routes/orders'
import ProfileAddressesPage from './routes/profile/addresses'
import ProfileChildrenPage from './routes/profile/children'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LayoutComponent />}>
              <Route index element={<HomePage />} />
              <Route path="books" element={<BooksPage />} />
              <Route path="books/:id" element={<BookDetailPage />} />
              <Route path="activities" element={<ActivitiesPage />} />
              <Route path="reading" element={<ReadingPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="shopping-cart" element={<ShoppingCartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="profile/addresses" element={<ProfileAddressesPage />} />
              <Route path="profile/children" element={<ProfileChildrenPage />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster position="top-center" />
      </div>
    </ConfigProvider>
  )
}

export default App