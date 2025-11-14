import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'

export function useAuth() {
  const { user, setUser, setIsAuthenticated, setIsLoading, isLoading } = useAuthStore()

  useEffect(() => {
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAuthenticated(false)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      setIsLoading(true)
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        await fetchUserProfile(authUser.id)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      toast.error('检查用户状态失败')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      if (data) {
        setUser(data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      toast.error('获取用户信息失败')
    }
  }

  const loginWithPhone = async (phone: string, code: string) => {
    try {
      setIsLoading(true)
      
      // 这里应该实现短信验证码登录逻辑
      // 暂时使用模拟登录
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${phone}@example.com`,
        password: code
      })

      if (error) throw error

      if (data.user) {
        await fetchUserProfile(data.user.id)
        toast.success('登录成功')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('登录失败，请检查手机号和验证码')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithWeChat = async () => {
    try {
      setIsLoading(true)
      // 这里应该实现微信登录逻辑
      toast.info('微信登录功能开发中...')
    } catch (error) {
      console.error('WeChat login error:', error)
      toast.error('微信登录失败')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      setUser(null)
      setIsAuthenticated(false)
      toast.success('退出登录成功')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('退出登录失败')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithPhone,
    loginWithWeChat,
    logout
  }
}