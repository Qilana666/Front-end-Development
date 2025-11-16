import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useBooks } from '@/hooks/useBooks'
import { formatPrice, formatAgeRange, getImageUrl } from '@/lib/utils'
import { Search, Filter, BookOpen, Star } from 'lucide-react'
import { useState } from 'react'

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAge, setSelectedAge] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const { books, isLoading } = useBooks(selectedCategory === 'all' ? undefined : selectedCategory, searchQuery)

  const categories = [
    { id: 'all', name: '全部分类', icon: '📚' },
    { id: '情绪管理', name: '情绪管理', icon: '😊' },
    { id: '科普知识', name: '科普知识', icon: '🔬' },
    { id: '传统文化', name: '传统文化', icon: '🏮' },
    { id: '品格培养', name: '品格培养', icon: '⭐' },
    { id: '友情', name: '友情', icon: '👫' },
    { id: '家庭', name: '家庭', icon: '🏠' },
    { id: '冒险', name: '冒险', icon: '🗺️' },
  ]

  const ageRanges = [
    { id: 'all', name: '全年龄段' },
    { id: '0-3', name: '0-3岁' },
    { id: '3-6', name: '3-6岁' },
    { id: '6-9', name: '6-9岁' },
    { id: '9-12', name: '9-12岁' },
  ]

  const filteredBooks = books.filter(book => {
    if (selectedAge === 'all') return true
    
    const [minAge, maxAge] = selectedAge.split('-').map(Number)
    const bookMinAge = book.age_range_min || 0
    const bookMaxAge = book.age_range_max || 18
    
    return bookMinAge <= maxAge && bookMaxAge >= minAge
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-primary-600">绘本馆</h1>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="small">返回</Button>
            </Link>
          </div>

          {/* 搜索栏 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索绘本名称、作者..."
              className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-primary-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 筛选器 */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* 分类筛选 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">绘本分类</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-primary-50'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 年龄段筛选 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">适读年龄</h3>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => setSelectedAge(age.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedAge === age.id
                        ? 'bg-secondary-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-secondary-50'
                    }`}
                  >
                    {age.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-t-2xl" />
                <CardContent className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">暂无相关绘本</h3>
            <p className="text-gray-500">试试调整筛选条件或搜索其他关键词</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-t-2xl relative">
                    <img
                      src={getImageUrl(book.cover_image)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {book.is_featured && (
                      <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        推荐
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm group-hover:text-primary-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-600 font-semibold text-sm">
                        {formatPrice(book.price)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{book.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatAgeRange(book.age_range_min, book.age_range_max)}</span>
                      {book.category && (
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {book.category}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
