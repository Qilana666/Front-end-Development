import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useActivities } from '@/hooks/useActivities'
import { formatPrice, formatDateTime, formatAgeRange, getImageUrl } from '@/lib/utils'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'
import { useState } from 'react'

export default function ActivitiesPage() {
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const { activities, isLoading } = useActivities(
    selectedCity === 'all' ? undefined : selectedCity
  )

  const cities = [
    { id: 'all', name: '全部城市' },
    { id: '北京', name: '北京' },
    { id: '上海', name: '上海' },
    { id: '广州', name: '广州' },
    { id: '深圳', name: '深圳' },
    { id: '杭州', name: '杭州' },
    { id: '成都', name: '成都' },
  ]

  const activityTypes = [
    { id: 'all', name: '全部类型', icon: '🎯' },
    { id: 'story_telling', name: '故事会', icon: '📖' },
    { id: 'craft', name: '手工课', icon: '🎨' },
    { id: 'outdoor', name: '户外活动', icon: '🌳' },
    { id: 'drama', name: '戏剧表演', icon: '🎭' },
    { id: 'reading_club', name: '读书会', icon: '📚' },
  ]

  const filteredActivities = activities.filter(activity => {
    if (selectedType === 'all') return true
    return activity.activity_type === selectedType
  })

  const getActivityTypeStyle = (type: string) => {
    const styles = {
      story_telling: 'bg-purple-100 text-purple-700',
      craft: 'bg-pink-100 text-pink-700',
      outdoor: 'bg-green-100 text-green-700',
      drama: 'bg-orange-100 text-orange-700',
      reading_club: 'bg-blue-100 text-blue-700',
    }
    return styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-primary-600">亲子活动</h1>
            </div>
            <Link to="/">
              <Button variant="ghost" size="small">返回</Button>
            </Link>
          </div>

          {/* 筛选栏 */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition-all ${
                showFilters ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 类型筛选 */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">活动类型</h3>
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-primary-50'
                  }`}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">暂无相关活动</h3>
            <p className="text-gray-500">试试调整筛选条件或查看其他城市</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <Link key={activity.id} to={`/activities/${activity.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex space-x-4">
                    {/* 左侧图片 */}
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={getImageUrl(activity.cover_image || '亲子活动场景插画，温馨的家庭活动，手绘风格，柔和色彩')}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex-1 space-y-3">
                      {/* 顶部信息 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeStyle(activity.activity_type)}`}>
                            {getActivityTypeLabel(activity.activity_type)}
                          </span>
                          {activity.is_featured && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                              推荐
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            {formatPrice(activity.price)}
                          </div>
                          {activity.original_price && activity.original_price > activity.price && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatPrice(activity.original_price)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 标题 */}
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-primary-600 transition-colors">
                        {activity.title}
                      </h3>

                      {/* 描述 */}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {activity.description}
                      </p>

                      {/* 时间信息 */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(activity.start_time).toLocaleDateString('zh-CN', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {activity.current_participants}/{activity.max_participants}人
                          </span>
                        </div>
                      </div>

                      {/* 地点信息 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {activity.city}
                            {activity.district && ` • ${activity.district}`}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatAgeRange(activity.age_range_min, activity.age_range_max)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
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
