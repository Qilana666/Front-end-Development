import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDateTime, getImageUrl } from '@/lib/utils'
import { CreditCard, Truck, Shield, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('wechat')
  const [agreeTerms, setAgreeTerms] = useState(false)

  // 模拟订单数据
  const orderItems = [
    {
      id: '1',
      title: '猜猜我有多爱你',
      cover_image: '温馨亲子绘本封面，小兔子和大兔子，柔和色彩',
      price: 35.8,
      quantity: 1,
      type: 'book' as const
    },
    {
      id: '2', 
      title: '亲子绘本故事会',
      cover_image: '亲子活动场景插画，温馨的家庭活动，手绘风格，柔和色彩',
      price: 128,
      quantity: 2,
      type: 'activity' as const
    }
  ]

  const shippingAddress = {
    name: '小明妈妈',
    phone: '138****8888',
    address: '北京市朝阳区建国路88号SOHO现代城A座1205室'
  }

  const paymentMethods = [
    {
      id: 'wechat',
      name: '微信支付',
      icon: '💚',
      description: '推荐使用微信支付'
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: '💙',
      description: '使用支付宝支付'
    },
    {
      id: 'card',
      name: '银行卡',
      icon: '💳',
      description: '使用银行卡支付'
    }
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingFee = 10
  const total = subtotal + shippingFee

  const handleSubmitOrder = async () => {
    if (!agreeTerms) {
      toast.error('请先同意用户协议')
      return
    }

    try {
      // 模拟提交订单
      toast.success('订单提交成功！')
      // 跳转到支付页面或订单详情页
      setTimeout(() => {
        window.location.href = '/orders'
      }, 1500)
    } catch (error) {
      toast.error('订单提交失败，请重试')
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
            <h1 className="text-lg font-bold text-primary-600">确认订单</h1>
            <div className="w-8" /> {/* 占位符 */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* 收货地址 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary-600" />
              <span>收货地址</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{shippingAddress.name}</span>
                  <span className="text-gray-500">{shippingAddress.phone}</span>
                </div>
                <Button variant="ghost" size="small">
                  修改
                </Button>
              </div>
              <p className="text-gray-700">{shippingAddress.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* 商品列表 */}
        <Card>
          <CardHeader>
            <CardTitle>商品清单</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex space-x-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(item.cover_image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">数量: {item.quantity}</span>
                      <span className="font-semibold text-primary-600">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.type === 'book' ? '实体绘本' : '亲子活动'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 支付方式 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              <span>支付方式</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                  {selectedPayment === method.id && (
                    <Check className="w-5 h-5 text-primary-600" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 订单备注 */}
        <Card>
          <CardHeader>
            <CardTitle>订单备注</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="如有特殊要求请在此说明（选填）"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* 费用明细 */}
        <Card>
          <CardHeader>
            <CardTitle>费用明细</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">商品小计</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">运费</span>
                <span className="font-medium">{formatPrice(shippingFee)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">总计</span>
                  <span className="text-2xl font-bold text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 用户协议 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  agreeTerms 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'border-gray-300 hover:border-primary-500'
                }`}
              >
                {agreeTerms && <Check className="w-3 h-3" />}
              </button>
              <div className="text-sm text-gray-600">
                我已阅读并同意
                <a href="/terms" className="text-primary-600 hover:text-primary-700 mx-1">《用户协议》</a>
                和
                <a href="/privacy" className="text-primary-600 hover:text-primary-700 mx-1">《隐私政策》</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 安全提示 */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>支付信息将被加密传输，保障您的支付安全</span>
        </div>
      </div>

      {/* 底部提交栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-sm text-gray-600">应付金额</div>
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(total)}
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmitOrder}
            disabled={!agreeTerms}
            className="px-8"
            size="large"
          >
            提交订单
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage