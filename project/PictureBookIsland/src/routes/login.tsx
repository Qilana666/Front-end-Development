import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { Phone, MessageCircle, User, BookOpen } from 'lucide-react'

function LoginPage() {
  const navigate = useNavigate()
  const { loginWithPhone, loginWithWeChat, isLoading } = useAuth()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const validatePhone = (phone: string): boolean => {
    return /^1[3-9]\d{9}$/.test(phone)
  }

  const sendCode = async () => {
    if (!validatePhone(phone)) {
      toast.error('请输入正确的手机号')
      return
    }

    try {
      // 模拟发送验证码
      setIsCodeSent(true)
      setCountdown(60)
      toast.success('验证码已发送')
      
      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      toast.error('发送验证码失败')
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePhone(phone)) {
      toast.error('请输入正确的手机号')
      return
    }

    if (!code || code.length !== 6) {
      toast.error('请输入6位验证码')
      return
    }

    await loginWithPhone(phone, code)
    navigate('/')
  }

  const handleWeChatLogin = async () => {
    await loginWithWeChat()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-yellow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo 区域 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary-600 mb-2">欢迎来到绘本岛</h1>
          <p className="text-gray-600">让亲子时光，更温暖一点</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl">登录账号</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 手机号登录 */}
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">手机号</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入手机号"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    maxLength={11}
                  />
                </div>
              </div>

              {isCodeSent && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">验证码</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="请输入验证码"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      maxLength={6}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {!isCodeSent ? (
                  <Button
                    type="button"
                    onClick={sendCode}
                    disabled={!validatePhone(phone) || countdown > 0}
                    className="w-full"
                    size="large"
                  >
                    {countdown > 0 ? `${countdown}秒后重试` : '发送验证码'}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading || !code || code.length !== 6}
                    className="w-full"
                    size="large"
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </Button>
                )}
              </div>
            </form>

            {/* 分割线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或者</span>
              </div>
            </div>

            {/* 微信登录 */}
            <Button
              type="button"
              variant="outline"
              onClick={handleWeChatLogin}
              disabled={isLoading}
              className="w-full"
              size="large"
            >
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span>微信一键登录</span>
              </div>
            </Button>

            {/* 游客登录 */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                <div className="flex items-center justify-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>游客浏览</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 底部提示 */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>登录即表示您同意我们的</p>
          <div className="space-x-4 mt-1">
            <Link to="/terms" className="text-primary-600 hover:text-primary-700">用户协议</Link>
            <span>和</span>
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700">隐私政策</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage