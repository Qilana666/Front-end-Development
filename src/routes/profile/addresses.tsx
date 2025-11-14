import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { Plus, MapPin, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function AddressesPage() {
  const [addresses] = useState([
    {
      id: '1',
      name: '小明妈妈',
      phone: '13888888888',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '建国路88号SOHO现代城A座1205室',
      is_default: true,
      postal_code: '100022'
    },
    {
      id: '2',
      name: '小红妈妈',
      phone: '13999999999',
      province: '上海市',
      city: '上海市', 
      district: '浦东新区',
      detail: '陆家嘴环路1000号',
      is_default: false,
      postal_code: '200120'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    postal_code: ''
  })

  const handleAddAddress = () => {
    if (!formData.name || !formData.phone || !formData.detail) {
      toast.error('请填写完整的地址信息')
      return
    }
    
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast.error('请输入正确的手机号')
      return
    }

    toast.success('地址添加成功')
    setShowAddForm(false)
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      postal_code: ''
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个地址吗？')) {
      toast.success('地址已删除')
    }
  }

  const handleSetDefault = (id: string) => {
    toast.success('已设为默认地址')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/profile">
              <Button variant="ghost" size="small">← 返回</Button>
            </Link>
            <h1 className="text-lg font-bold text-primary-600">收货地址</h1>
            <Button 
              onClick={() => setShowAddForm(true)}
              size="small"
              variant="ghost"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-32">
        {/* 地址列表 */}
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            <Card key={address.id} className={address.is_default ? 'border-primary-200' : ''}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* 联系人信息 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{address.name}</div>
                        <div className="text-sm text-gray-600">{address.phone}</div>
                      </div>
                    </div>
                    {address.is_default && (
                      <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        默认
                      </span>
                    )}
                  </div>

                  {/* 地址信息 */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 text-sm text-gray-700">
                      <div>{address.province} {address.city} {address.district}</div>
                      <div>{address.detail}</div>
                      {address.postal_code && (
                        <div className="text-gray-500">邮编: {address.postal_code}</div>
                      )}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {!address.is_default && (
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          设为默认
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(address.id)}
                      >
                        删除
                      </Button>
                    </div>
                    <Button
                      size="small"
                      variant="outline"
                    >
                      编辑
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 添加地址按钮 */}
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full"
          size="large"
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>添加新地址</span>
          </div>
        </Button>
      </div>

      {/* 添加地址表单模态框 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>添加新地址</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">收货人姓名</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="请输入收货人姓名"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">手机号码</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="请输入手机号码"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      maxLength={11}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">所在地区</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value})}
                      className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">请选择省份</option>
                      <option value="北京市">北京市</option>
                      <option value="上海市">上海市</option>
                      <option value="广东省">广东省</option>
                    </select>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">请选择城市</option>
                      <option value="北京市">北京市</option>
                      <option value="上海市">上海市</option>
                      <option value="广州市">广州市</option>
                    </select>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">请选择区县</option>
                      <option value="朝阳区">朝阳区</option>
                      <option value="浦东新区">浦东新区</option>
                      <option value="天河区">天河区</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">详细地址</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={formData.detail}
                      onChange={(e) => setFormData({...formData, detail: e.target.value})}
                      placeholder="请输入详细地址，如街道、门牌号等"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">邮政编码（选填）</label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                    placeholder="请输入邮政编码"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    maxLength={6}
                  />
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
                  onClick={handleAddAddress}
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

export default AddressesPage