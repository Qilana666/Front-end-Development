import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatAgeRange, getImageUrl } from '@/lib/utils'
import { Star, Heart, Share2, ShoppingCart, BookOpen, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function BookDetailPage() {
  const { id } = useParams()
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedPreview, setSelectedPreview] = useState(0)

  // 模拟绘本数据
  const book = {
    id,
    title: '猜猜我有多爱你',
    author: '山姆·麦克布雷尼',
    illustrator: '安妮塔·婕朗',
    translator: '梅子涵',
    publisher: '明天出版社',
    publish_date: '2013-07-01',
    isbn: '9787533267242',
    description: '《猜猜我有多爱你》是全球畅销的绘本，讲述了小兔子和大兔子之间温馨的爱的故事。通过简单的对话和精美的插画，让孩子理解爱的深度和广度，是一本非常适合亲子共读的绘本。',
    cover_image: '温馨亲子绘本插画，小兔子和大兔子相互拥抱，柔和的水彩画风，暖色调背景',
    preview_images: [
      '绘本内页插画，小兔子张开双臂表达爱，温暖的家庭场景，柔和色彩',
      '绘本内页插画，大兔子和小兔子在草地上玩耍，自然风光背景',
      '绘本内页插画，夜晚星空下的兔子家庭，温馨浪漫的氛围',
      '绘本内页插画，小兔子在大兔子怀中入睡，柔和的睡前场景'
    ],
    age_range_min: 2,
    age_range_max: 6,
    pages: 32,
    price: 35.8,
    category: '情绪管理',
    tags: ['亲情', '爱', '睡前故事', '情感教育'],
    language: '中文',
    binding_type: 'hardcover' as const,
    dimensions: '210x280x15mm',
    weight: 0.4,
    rating: 4.8,
    review_count: 1234,
    sales_count: 5678,
    stock_quantity: 50,
    is_featured: true,
    is_active: true
  }

  const reviews = [
    {
      id: '1',
      user_name: '小明妈妈',
      avatar: '妈妈头像，温柔的女性形象，手绘风格',
      rating: 5,
      content: '这本书真的太温暖了！每天晚上都会和孩子一起读，孩子特别喜欢小兔子和大兔子之间的对话。',
      created_at: '2024-01-15',
      helpful_count: 23
    },
    {
      id: '2', 
      user_name: '亲子阅读达人',
      avatar: '阅读达人头像，知识分子的形象，手绘风格',
      rating: 5,
      content: '经典的绘本，插画非常精美，文字简单但富有深意。强烈推荐给所有有孩子的家庭！',
      created_at: '2024-01-10',
      helpful_count: 18
    }
  ]

  const handleAddToCart = () => {
    toast.success('已添加到购物车')
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? '已取消收藏' : '已添加到收藏')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('链接已复制到剪贴板')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-primary-600 transition-colors">
              ← 返回
            </button>
            <h1 className="text-lg font-bold text-primary-600">绘本详情</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 基本信息区域 */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 左侧：封面和预览 */}
            <div className="space-y-4">
              {/* 主封面 */}
              <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden">
                <img
                  src={getImageUrl(book.cover_image)}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 预览图 */}
              <div className="grid grid-cols-4 gap-2">
                {book.preview_images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPreview(index)}
                    className={`aspect-[3/4] bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPreview === index ? 'border-primary-500' : 'border-transparent hover:border-primary-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`预览 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧：详细信息 */}
            <div className="space-y-6">
              {/* 标题和评分 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
                  {book.is_featured && (
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      推荐
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{book.rating}</span>
                    <span className="text-gray-500">({book.review_count}人评价)</span>
                  </div>
                  <span className="text-gray-500">已售{book.sales_count}本</span>
                </div>
              </div>

              {/* 作者信息 */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">作者：</span>
                  <span className="font-medium">{book.author}</span>
                </div>
                {book.illustrator && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">绘者：</span>
                    <span className="font-medium">{book.illustrator}</span>
                  </div>
                )}
                {book.translator && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">译者：</span>
                    <span className="font-medium">{book.translator}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">出版社：</span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">出版时间：</span>
                  <span className="font-medium">{new Date(book.publish_date).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>

              {/* 规格信息 */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600 mb-1">适读年龄</div>
                  <div className="font-semibold">{formatAgeRange(book.age_range_min, book.age_range_max)}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600 mb-1">页数</div>
                  <div className="font-semibold">{book.pages}页</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600 mb-1">装帧</div>
                  <div className="font-semibold">
                    {book.binding_type === 'hardcover' ? '精装' : 
                     book.binding_type === 'paperback' ? '平装' :
                     book.binding_type === 'board_book' ? '纸板书' : '立体书'}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600 mb-1">语言</div>
                  <div className="font-semibold">{book.language}</div>
                </div>
              </div>

              {/* 标签 */}
              <div>
                <div className="text-gray-600 mb-2">标签</div>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 价格 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary-600">{formatPrice(book.price)}</span>
                  {book.binding_type === 'hardcover' && (
                    <span className="ml-2 text-sm text-gray-500">精装版</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  库存：{book.stock_quantity}本
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="large"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>加入购物车</span>
                  </div>
                </Button>
                <Button 
                  variant="secondary"
                  className="flex-1"
                  size="large"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>立即购买</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* 绘本简介 */}
        <Card>
          <CardHeader>
            <CardTitle>绘本简介</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </CardContent>
        </Card>

        {/* 用户评价 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>用户评价</CardTitle>
              <span className="text-sm text-gray-500">{book.review_count}条评价</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={getImageUrl(review.avatar)}
                        alt={review.user_name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{review.user_name}</div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.content}</p>
                  <div className="flex items-center justify-between text-sm">
                    <button className="text-gray-500 hover:text-primary-600 transition-colors">
                      有帮助 ({review.helpful_count})
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="w-full">
                查看更多评价
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 相关推荐 */}
        <Card>
          <CardHeader>
            <CardTitle>相关推荐</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden mb-3">
                    <img
                      src={getImageUrl('温馨亲子绘本封面，柔和色彩，手绘风格')}
                      alt="推荐绘本"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm mb-1 group-hover:text-primary-600 transition-colors">
                    推荐绘本 {i + 1}
                  </h4>
                  <p className="text-xs text-gray-600">作者名称</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookDetailPage