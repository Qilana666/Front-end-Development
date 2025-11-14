import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDateTime, getImageUrl } from '@/lib/utils'
import { Package, Truck, CheckCircle, Clock, XCircle, PackageCheck, CreditCard } from 'lucide-react'
import { useState } from 'react'

function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'>('all')

  // 模拟订单数据
  const orders = [
    {
      id: 'ORD202401150001',
      status: 'paid' as const,
      total_amount: 163.6,
      created_at: '2024-01-15T10:30:00Z',
      items: [
        {
          id: '1',
          title: '猜猜我有多爱你',
          cover_image: '温馨亲子绘本封面，小兔子和大兔子，柔和色彩',
          price: 35.8,
          quantity: 1,
          type: 'book' as const
        }
      ],
      shipping_address: {
        name: '小明妈妈',
        phone: '138****8888',
        address: '北京市朝阳区建国路88号SOHO现代城A座1205室'
      },
      payment_method: 'wechat',
      payment_status: 'paid' as const,
      tracking_number: 'SF1234567890',
      logistics_company: '顺丰速运'
    },
    {
      id: 'ORD202401140002',
      status: 'delivered' as const,
      total_amount: 256.0,
      created_at: '2024-01-14T14:20:00Z',
      items: [
        {
          id: '2',
          title: '好饿的毛毛虫',
          cover_image: '经典绘本封面，可爱的毛毛虫，色彩鲜艳',
          price: 28.0,
          quantity: 2,
          type: 'book' as const
        }
      ],
      shipping_address: {
        name: '小红妈妈',
        phone: '139****9999',
        address: '上海市浦东新区陆家嘴环路1000号'
      },
      payment_method: 'alipay',
      payment_status: 'paid' as const,
      delivered_at: '2024-01-16T09:15:00Z'
    },
    {
      id: 'ORD202401130003',
      status: 'pending' as const,
      total_amount: 128.0,
      created_at: '2024-01-13T16:45:00Z',
      items: [
        {
          id: '3',
          title: '亲子绘本故事会',
          cover_image: '亲子活动场景插画，温馨的家庭活动，手绘风格，柔和色彩',
          price: 128.0,
          quantity: 1,
          type: 'activity' as const
        }
      ],
      shipping_address: {
        name: '小李爸爸',
        phone: '137****7777',
        address: '广州市天河区珠江新城花城大道85号'
      },
      payment_method: 'wechat',
      payment_status: 'unpaid' as const
    },
    {
      id: 'ORD202401120004',
      status: 'shipped' as const,
      total_amount: 89.5,
      created_at: '2024-01-12T09:20:00Z',
      items: [
        {
          id: '4',
          title: '小熊宝宝绘本',
          cover_image: '可爱小熊封面，温馨风格，柔和色彩',
          price: 89.5,
          quantity: 1,
          type: 'book' as const
        }
      ],
      shipping_address: {
        name: '小王妈妈',
        phone: '136****6666',
        address: '深圳市南山区科技园南区'
      },
      payment_method: 'wechat',
      payment_status: 'paid' as const,
      tracking_number: 'YT9876543210',
      logistics_company: '圆通速递'
    },
    {
      id: 'ORD202401110005',
      status: 'cancelled' as const,
      total_amount: 45.8,
      created_at: '2024-01-11T11:30:00Z',
      items: [
        {
          id: '5',
          title: '我爸爸',
          cover_image: '爸爸形象插画，温馨家庭风格，柔和色彩',
          price: 45.8,
          quantity: 1,
          type: 'book' as const
        }
      ],
      shipping_address: {
        name: '小张妈妈',
        phone: '135****5555',
        address: '杭州市西湖区文三路478号'
      },
      payment_method: 'wechat',
      payment_status: 'refunded' as const,
      cancelled_at: '2024-01-11T15:20:00Z',
      cancel_reason: '用户取消订单'
    }
  ]

  const tabs = [
    { id: 'all', name: '全部', count: orders.length },
    { id: 'pending', name: '待付款', count: orders.filter(o => o.status === 'pending').length },
    { id: 'paid', name: '已付款', count: orders.filter(o => o.status === 'paid').length },
    { id: 'shipped', name: '已发货', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', name: '已完成', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', name: '已取消', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedTab)

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      paid: <CheckCircle className="w-4 h-4 text-green-500" />,
      shipped: <Truck className="w-4 h-4 text-blue-500" />,
      delivered: <PackageCheck className="w-4 h-4 text-green-600" />,
      cancelled: <XCircle className="w-4 h-4 text-red-500" />
    }
    return icons[status as keyof typeof icons] || <Package className="w-4 h-4 text-gray-500" />
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: '待付款',
      paid: '已付款',
      shipped: '已发货',
      delivered: '已完成',
      cancelled: '已取消'
    }
    return texts[status as keyof typeof texts] || '未知状态'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50',
      paid: 'text-green-600 bg-green-50',
      shipped: 'text-blue-600 bg-blue-50',
      delivered: 'text-green-700 bg-green-100',
      cancelled: 'text-red-600 bg-red-50'
    }
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50'
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
            <h1 className="text-lg font-bold text-primary-600">我的订单</h1>
            <div className="w-16" /> {/* 占位符 */}
          </div>
        </div>
      </header>

      {/* 标签页 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-1 bg-white rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-primary-50'
              }`}
            >
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="container mx-auto px-4 pb-32">
        {filteredOrders.length === 0 ? (
          <Card className="text-center">
            <CardContent className="p-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">暂无相关订单</h3>
              <p className="text-gray-500 mb-6">快去挑选一些绘本或活动吧</p>
              <Link to="/">
                <Button>去逛逛</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                {/* 订单头部 */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(order.created_at)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">订单号: {order.id}</div>
                </div>

                {/* 商品信息 */}
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={getImageUrl(item.cover_image)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <div className="text-sm text-gray-600">
                            {item.type === 'book' ? '实体绘本' : '亲子活动'} × {item.quantity}
                          </div>
                          <div className="text-primary-600 font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 订单总价 */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">总计:</span>
                      <span className="text-lg font-bold text-primary-600">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </div>

                  {/* 收货地址 */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>收货人: {order.shipping_address.name} {order.shipping_address.phone}</div>
                      <div>地址: {order.shipping_address.address}</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      {order.payment_method === 'wechat' ? '微信支付' : 
                       order.payment_method === 'alipay' ? '支付宝' : '银行卡'}
                    </div>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <>
                          <Button size="small" variant="outline">
                            取消订单
                          </Button>
                          <Button size="small">
                            立即付款
                          </Button>
                        </>
                      )}
                      {order.status === 'paid' && (
                        <Button size="small" variant="outline">
                          申请退款
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button size="small">
                          确认收货
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button size="small" variant="outline">
                          申请售后
                        </Button>
                      )}
                      <Button size="small" variant="ghost">
                        查看详情
                      </Button>
                    </div>
                  </div>

                  {/* 物流信息 */}
                  {order.tracking_number && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-700">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4" />
                          <span>{order.logistics_company}: {order.tracking_number}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage