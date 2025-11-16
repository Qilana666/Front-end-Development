import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cart'
import { formatPrice, getImageUrl } from '@/lib/utils'
import { ShoppingCart, Trash2, Plus, Minus, Check } from 'lucide-react'
import { toast } from 'sonner'

function ShoppingCartPage() {
  const { 
    items, 
    toggleSelect, 
    selectAll, 
    updateQuantity, 
    removeItem,
    getTotalPrice,
    getSelectedCount 
  } = useCartStore()

  const selectedItems = items.filter(item => item.selected)
  const allSelected = items.length > 0 && items.every(item => item.selected)

  const handleSelectAll = () => {
    selectAll(!allSelected)
  }

  const handleRemove = (id: string) => {
    removeItem(id)
    toast.success('商品已移除')
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('请选择要购买的商品')
      return
    }
    // 跳转到结算页面
    window.location.href = '/checkout'
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">购物车是空的</h2>
            <p className="text-gray-600 mb-6">快去挑选一些绘本或活动吧</p>
            <Link to="/">
              <Button className="w-full" size="large">
                去逛逛
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="small">← 返回</Button>
            </Link>
            <h1 className="text-lg font-bold text-primary-600">购物车</h1>
            <div className="w-16" /> {/* 占位符 */}
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-6 pb-32">
        {/* 全选 */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSelectAll}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    allSelected 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {allSelected && <Check className="w-3 h-3" />}
                </button>
                <span className="font-medium">全选</span>
              </div>
              <div className="text-sm text-gray-500">
                已选 {getSelectedCount()} 件
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 商品列表 */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className={item.selected ? 'border-primary-200' : ''}>
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  {/* 选择框 */}
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleSelect(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.selected 
                          ? 'bg-primary-500 border-primary-500 text-white' 
                          : 'border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {item.selected && <Check className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 商品图片 */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(item.cover_image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 商品信息 */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-800 line-clamp-2">{item.title}</h3>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 商品属性 */}
                    {item.metadata && (
                      <div className="text-xs text-gray-500 space-y-1">
                        {item.metadata.age_range && (
                          <div>适读年龄: {item.metadata.age_range}</div>
                        )}
                        {item.metadata.date && (
                          <div>活动时间: {item.metadata.date}</div>
                        )}
                        {item.metadata.location && (
                          <div>地点: {item.metadata.location}</div>
                        )}
                      </div>
                    )}

                    {/* 价格和数量 */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-primary-600">
                        {formatPrice(item.price)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 底部结算栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-sm text-gray-600">合计</div>
              <div className="text-xl font-bold text-primary-600">
                {formatPrice(getTotalPrice())}
              </div>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className="px-8"
            size="large"
          >
            结算 ({getSelectedCount()})
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage
