import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useFeaturedBooks } from '@/hooks/useBooks'
import { useFeaturedActivities } from '@/hooks/useActivities'
import { formatPrice, formatAgeRange, getImageUrl } from '@/lib/utils'
import { BookOpen, Calendar, Heart, Star } from 'lucide-react'

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const { books: featuredBooks, isLoading: booksLoading } = useFeaturedBooks()
  const { activities: featuredActivities, isLoading: activitiesLoading } = useFeaturedActivities()

  const banners = [
    {
      id: '1',
      title: '六一儿童节精选绘本',
      image: '温馨儿童节主题绘本插画，包含彩虹、气球、礼物盒元素，手绘风格，柔和色彩',
      link: '/books?special=childrens-day',
      type: 'special' as const
    },
    {
      id: '2', 
      title: '亲子阅读打卡活动',
      image: '亲子共读场景插画，温馨的阅读角落，柔和灯光，父母和孩子一起读书，手绘风格',
      link: '/activities/reading-challenge',
      type: 'activity' as const
    },
    {
      id: '3',
      title: '新用户专享福利',
      image: '欢迎新用户主题插画，包含礼物、优惠券、绘本元素，温馨可爱的设计风格',
      link: '/promotion/new-user',
      type: 'special' as const
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-600">绘本岛</h1>
                <p className="text-xs text-gray-500">让亲子时光更温暖</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/books" className="text-gray-600 hover:text-primary-600 transition-colors">
                绘本馆
              </Link>
              <Link to="/activities" className="text-gray-600 hover:text-primary-600 transition-colors">
                亲子活动
              </Link>
              <Link to="/reading" className="text-gray-600 hover:text-primary-600 transition-colors">
                阅读记录
              </Link>
              
              {isAuthenticated ? (
                <Link to="/profile">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-accent-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.nickname?.charAt(0) || '用'}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="small">登录</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 轮播图区域 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <Link key={banner.id} to={banner.link}>
                <Card className="h-48 relative overflow-hidden group">
                  <img
                    src={getImageUrl(banner.image)}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{banner.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 热门绘本推荐 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">热门绘本推荐</h2>
            <Link to="/books" className="text-primary-600 hover:text-primary-700 font-medium">
              查看更多 →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {booksLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 rounded-t-2xl" />
                  <CardContent className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredBooks.slice(0, 5).map((book) => (
                <Link key={book.id} to={`/books/${book.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[3/4] overflow-hidden rounded-t-2xl">
                      <img
                        src={getImageUrl(book.cover_image)}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-semibold text-sm">
                          {formatPrice(book.price)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{book.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatAgeRange(book.age_range_min, book.age_range_max)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 亲子活动推荐 */}
      <section className="py-8 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">精选亲子活动</h2>
            <Link to="/activities" className="text-primary-600 hover:text-primary-700 font-medium">
              查看更多 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitiesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-2xl" />
                  <CardContent className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredActivities.slice(0, 3).map((activity) => (
                <Link key={activity.id} to={`/activities/${activity.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <div className="h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={getImageUrl(activity.cover_image || '亲子活动场景插画，温馨的家庭活动，手绘风格，柔和色彩')}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                          {getActivityTypeLabel(activity.activity_type)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {new Date(activity.start_time).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">{activity.city}</span>
                          {activity.district && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{activity.district}</span>
                            </>
                          )}
                        </div>
                        <span className="text-primary-600 font-semibold">
                          {formatPrice(activity.price)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatAgeRange(activity.age_range_min, activity.age_range_max)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-white/20 sticky bottom-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Link to="/" className="flex flex-col items-center space-y-1 text-primary-600">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">首页</span>
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
              <Heart className="w-6 h-6" />
              <span className="text-xs">阅读</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-primary-600 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-secondary-400 to-accent-pink rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user?.nickname?.charAt(0) || '我'}
                </span>
              </div>
              <span className="text-xs">我的</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

function getActivityTypeLabel(type: string): string {
  const labels = {
    story_telling: '故事会',
    craft: '手工课',
    outdoor: '户外活动',
    drama: '戏剧表演',
    reading_club: '读书会'
  }
  return labels[type as keyof typeof labels] || '活动'
}
