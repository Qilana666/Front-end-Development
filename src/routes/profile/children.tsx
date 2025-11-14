//
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { User, Calendar, Heart, Star, Camera, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function ChildrenPage() {
  const [children] = useState([
    {
      id: '1',
      name: '小明',
      gender: 'male' as const,
      birth_date: '2019-03-15',
      avatar_url: '可爱小男孩头像，卡通风格，明亮色彩',
      reading_level: 3,
      interests: ['动物', '恐龙', '汽车'],
      favorite_genres: ['科普', '冒险', '幽默'],
      is_active: true
    },
    {
      id: '2',
      name: '小红',
      gender: 'female' as const,
      birth_date: '2021-08-22',
      avatar_url: '可爱小女孩头像，卡通风格，粉色系',
      reading_level: 2,
      interests: ['公主', '动物', '音乐'],
      favorite_genres: ['童话', '情感', '艺术'],
      is_active: true
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    gender: '' as 'male' | 'female' | '',
    birth_date: '',
    interests: [] as string[],
    reading_level: 1
  })

  const readingLevels = [
    { value: 1, label: '启蒙阶段（0-2岁）', description: '适合简单图画书' },
    { value: 2, label: '基础阶段（2-4岁）', description: '适合简单故事书' },
    { value: 3, label: '进阶阶段（4-6岁）', description: '适合复杂故事书' },
    { value: 4, label: '独立阶段（6-8岁）', description: '适合自主阅读' },
    { value: 5, label: '熟练阶段（8岁以上）', description: '适合章节书' }
  ]

  const interestOptions = [
    '动物', '恐龙', '汽车', '公主', '王子', '魔法', '冒险', '科普', 
    '音乐', '艺术', '运动', '自然', '太空', '海洋', '历史', '文化'
  ]

  const handleAddChild = () => {
    if (!formData.name || !formData.gender || !formData.birth_date) {
      toast.error('请填写完整的孩子信息')
      return
    }

    toast.success('孩子档案添加成功')
    setShowAddForm(false)
    setFormData({
      name: '',
      gender: '',
      birth_date: '',
      interests: [],
      reading_level: 1
    })
  }

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      })
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      })
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
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
            <h1 className="text-lg font-bold text-primary-600">我的孩子</h1>
            <Button 
              onClick={() => setShowAddForm(true)}
              size="small"
              variant="ghost"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-32">
        {/* 孩子列表 */}
        <div className="space-y-4 mb-6">
          {children.map((child) => (
            <Card key={child.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  {/* 头像 */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(child.avatar_url)}
                      alt={child.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 基本信息 */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-gray-800">{child.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          child.gender === 'male' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {child.gender === 'male' ? '男' : '女'}
                        </span>
                      </div>
                      <Button size="small" variant="ghost">
                        编辑
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-gray-600">年龄</div>
                          <div className="font-medium">{calculateAge(child.birth_date)}岁</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-gray-600">阅读水平</div>
                        <div className="font-medium">{readingLevels[child.reading_level - 1].label}</div>
                        </div>
                      </div>
                    </div>

                    {/* 兴趣爱好 */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">兴趣爱好</div>
                      <div className="flex flex-wrap gap-1">
                        {child.interests.map((interest, index) => (
                          <span key={index} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 喜欢的类型 */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">喜欢的绘本类型</div>
                      <div className="flex flex-wrap gap-1">
                        {child.favorite_genres.map((genre, index) => (
                          <span key={index} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 添加孩子按钮 */}
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full"
          size="large"
        >
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>添加孩子档案</span>
          </div>
        </Button>
      </div>

      {/* 添加孩子表单模态框 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>添加孩子档案</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">孩子姓名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="请输入孩子姓名"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">性别</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setFormData({...formData, gender: 'male'})}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.gender === 'male'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      👦 男孩
                    </button>
                    <button
                      onClick={() => setFormData({...formData, gender: 'female'})}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.gender === 'female'
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      👧 女孩
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">出生日期</label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">阅读水平</label>
                  <div className="space-y-2">
                    {readingLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setFormData({...formData, reading_level: level.value})}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          formData.reading_level === level.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">兴趣爱好（可多选）</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-primary-100'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="flex-1"
                  size="large"
                >
                  取消
                </Button>
                <Button
                  onClick={handleAddChild}
                  className="flex-1"
                  size="large"
                >
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ChildrenPage
