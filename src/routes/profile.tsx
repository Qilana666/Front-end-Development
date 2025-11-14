import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { formatDate, getImageUrl } from '@/lib/utils'
import { User, Settings, ShoppingBag, Calendar, BookOpen, Heart, MapPin, CreditCard, Headphones } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()

  const menuItems = [
    {
      title: '我的孩子',
      icon: User,
      href: '/profile/children',
      description: '管理孩子档案'
    },
    {
      title: '我的订单',
      icon: ShoppingBag,
      href: '/profile/orders',
      description: '查看订单状态'
    },
    {
      title: '活动报名',
      icon: Calendar,
      href: '/profile/activities',
      description: '管理活动报名'
    },
    {
      title: '阅读记录',
      icon: BookOpen,
      href: '/reading',
      description: '查看阅读历史'
    },
    {
      title: '我的收藏',
      icon: Heart,
      href: '/profile/favorites',
      description: '收藏的绘本和活动'
    },
    {
      title: '收货地址',
      icon: MapPin,
      href: '/profile/addresses',
      description: '管理收货地址'
    },
    {
      title: '支付方式',
      icon: CreditCard,
      href: '/profile/payment',
      description: '管理支付方式'
    },
    {
      title: '联系客服',
      icon: Headphones,
      href: '/profile/support',
      description: '获得帮助和支持'
    }
  ]

  const handleLogout = async () => {
    await logout()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">请先登录</h2>
            <p className="text-gray-600 mb-6">登录后可以管理个人信息和订单</p>
            <Link to="/login">
              <Button className="w-full" size="large">
                立即登录
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部个人信息 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center">
              {user?.avatar_url ? (
                <img src={getImageUrl(user.avatar_url)} alt={user.nickname || ''} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">{user?.nickname || '用户'}</h1>
              <p className="text-gray-600">{user?.phone || user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user?.membership_level === 'platinum' ? 'bg-purple-100 text-purple-700' :
                  user?.membership_level === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                  user?.membership_level === 'silver' ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {user?.membership_level === 'platinum' ? '铂金会员' :
                   user?.membership_level === 'gold' ? '黄金会员' :
                   user?.membership_level === 'silver' ? '白银会员' : '青铜会员'}
                </span>
              </div>
            </div>
            <Link to="/profile/settings">
              <Button variant="ghost" size="small">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 统计信息 */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">23</div>
                <div className="text-xs text-gray-600">阅读记录</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">8</div>
                <div className="text-xs text-gray-600">活动报名</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-green">15</div>
                <div className="text-xs text-gray-600">收藏绘本</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-pink">¥299</div>
                <div className="text-xs text-gray-600">累计消费</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能菜单 */}
        <div className="space-y-4 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} to={item.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-secondary-200 transition-colors">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-primary-600 transition-colors">
                        →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* 退出登录 */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full"
          size="large"
        >
          退出登录
        </Button>
      </div>

      {/* 底部导航 */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-white/20 sticky bottom-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Link to="/" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">首页</span>
            </Link>
            <Link to="/books" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">绘本馆</span>
            </Link>
            <Link to="/activities" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">活动</span>
            </Link>
            <Link to="/reading" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">阅读</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center space-y-1 text-primary-600">
              <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-accent-pink rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user?.nickname?.charAt(0) || '我'}
                </span>
              </div>
              <span className="text-xs font-medium">我的</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
