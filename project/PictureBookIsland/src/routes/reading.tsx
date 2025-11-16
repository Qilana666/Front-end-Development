import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDate, getImageUrl } from '@/lib/utils'
import { BookOpen, Heart, Share2, Calendar, Star, Camera, Clock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function ReadingPage() {
  const [selectedTab, setSelectedTab] = useState<'records' | 'favorites' | 'achievements'>('records')

  // 模拟阅读记录数据
  const readingRecords = [
    {
      id: '1',
      book_title: '猜猜我有多爱你',
      book_cover: '温馨亲子绘本封面，小兔子和大兔子，柔和色彩',
      reading_date: '2024-01-15',
      reading_duration: 15,
      rating: 5,
      notes: '今天和宝宝一起读了这本温馨的绘本，宝宝特别喜欢小兔子张开双臂的那一幕，也跟着学了起来。',
      photos: ['亲子阅读照片，温馨的阅读时光，柔和灯光'],
      is_finished: true
    },
    {
      id: '2',
      book_title: '好饿的毛毛虫',
      book_cover: '经典绘本封面，可爱的毛毛虫，色彩鲜艳',
      reading_date: '2024-01-14',
      reading_duration: 12,
      rating: 4,
      notes: '毛毛虫变成蝴蝶的故事让宝宝很兴奋，开始数毛毛虫吃了多少东西。',
      photos: [],
      is_finished: true
    },
    {
      id: '3',
      book_title: '小熊宝宝绘本系列',
      book_cover: '可爱小熊绘本封面，温馨的家庭场景',
      reading_date: '2024-01-13',
      reading_duration: 8,
      rating: 5,
      notes: '正在进行中，宝宝很喜欢小熊的角色。',
      photos: [],
      is_finished: false
    }
  ]

  const favoriteBooks = [
    {
      id: '1',
      title: '猜猜我有多爱你',
      author: '山姆·麦克布雷尼',
      cover_image: '温馨亲子绘本封面，小兔子和大兔子，柔和色彩',
      rating: 5,
      added_date: '2024-01-10'
    },
    {
      id: '2',
      title: '好饿的毛毛虫',
      author: '艾瑞·卡尔',
      cover_image: '经典绘本封面，可爱的毛毛虫，色彩鲜艳',
      rating: 4,
      added_date: '2024-01-08'
    }
  ]

  const achievements = [
    {
      id: '1',
      name: '阅读新手',
      description: '完成第一次阅读打卡',
      icon: '🌟',
      earned_date: '2024-01-01',
      is_earned: true
    },
    {
      id: '2',
      name: '连续7天',
      description: '连续7天完成阅读打卡',
      icon: '🔥',
      earned_date: '2024-01-07',
      is_earned: true
    },
    {
      id: '3',
      name: '阅读达人',
      description: '累计阅读10本绘本',
      icon: '📚',
      progress: 3,
      target: 10,
      is_earned: false
    },
    {
      id: '4',
      name: '分享专家',
      description: '分享5次阅读心得',
      icon: '💝',
      progress: 1,
      target: 5,
      is_earned: false
    }
  ]

  const handleAddRecord = () => {
    toast.info('添加阅读记录功能开发中...')
  }

  const handleShare = (record: any) => {
    if (navigator.share) {
      navigator.share({
        title: `今天读了《${record.book_title}》`,
        text: record.notes || '分享了一次美好的阅读时光',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`今天和宝宝一起读了《${record.book_title}》：${record.notes}`)
      toast.success('分享内容已复制到剪贴板')
    }
  }

  const tabs = [
    { id: 'records', name: '阅读记录', icon: BookOpen },
    { id: 'favorites', name: '我的收藏', icon: Heart },
    { id: 'achievements', name: '成就勋章', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-primary-600" />
              <h1 className="text-lg font-bold text-primary-600">阅读记录</h1>
            </div>
            <Button onClick={handleAddRecord} size="small">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>打卡</span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* 统计卡片 */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">7</div>
                <div className="text-sm text-gray-600">连续打卡</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-600">23</div>
                <div className="text-sm text-gray-600">总阅读数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-green">5.2</div>
                <div className="text-sm text-gray-600">平均评分</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 标签页 */}
        <div className="flex space-x-1 mb-6 bg-white rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* 内容区域 */}
        {selectedTab === 'records' && (
          <div className="space-y-4">
            {readingRecords.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    {/* 左侧封面 */}
                    <div className="w-20 h-28 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getImageUrl(record.book_cover)}
                        alt={record.book_title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex-1 space-y-3">
                      {/* 顶部信息 */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{record.book_title}</h3>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < record.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* 日期和时长 */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(record.reading_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{record.reading_duration}分钟</span>
                        </div>
                      </div>

                      {/* 阅读状态 */}
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.is_finished 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.is_finished ? '已完成' : '进行中'}
                        </span>
                      </div>

                      {/* 读后感 */}
                      {record.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{record.notes}</p>
                        </div>
                      )}

                      {/* 照片 */}
                      {record.photos && record.photos.length > 0 && (
                        <div className="flex space-x-2">
                          {record.photos.map((photo, index) => (
                            <div key={index} className="w-16 h-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg overflow-hidden">
                              <img
                                src={getImageUrl(photo)}
                                alt="阅读照片"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 操作按钮 */}
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          variant="outline"
                          onClick={() => handleShare(record)}
                        >
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-3 h-3" />
                            <span>分享</span>
                          </div>
                        </Button>
                        <Button size="small" variant="ghost">
                          <div className="flex items-center space-x-1">
                            <Camera className="w-3 h-3" />
                            <span>编辑</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'favorites' && (
          <div className="grid grid-cols-2 gap-4">
            {favoriteBooks.map((book) => (
              <Card key={book.id} className="group">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden mb-3">
                    <img
                      src={getImageUrl(book.cover_image)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm group-hover:text-primary-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(book.added_date)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.is_earned ? 'border-primary-200' : 'opacity-75'}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      achievement.is_earned 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      {achievement.is_earned ? (
                        <p className="text-xs text-primary-600">
                          获得于 {formatDate(achievement.earned_date!)}
                        </p>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReadingPage