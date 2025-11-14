import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/lib/supabase'
import { toast } from 'sonner'

export function useActivities(city?: string, district?: string) {
  const [activities, setActivities] = useState<Tables<'activities'>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActivities()
  }, [city, district])

  const fetchActivities = async () => {
    try {
      setIsLoading(true)
      setError(null)

      let query = supabase
        .from('activities')
        .select('*')
        .order('start_time', { ascending: true })

      if (city) {
        query = query.eq('city', city)
      }

      if (district) {
        query = query.eq('district', district)
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) throw supabaseError

      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
      setError('获取活动列表失败')
      toast.error('获取活动列表失败')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    activities,
    isLoading,
    error,
    refetch: fetchActivities
  }
}

export function useFeaturedActivities() {
  const [activities, setActivities] = useState<Tables<'activities'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchFeaturedActivities()
  }, [])

  const fetchFeaturedActivities = async () => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('is_featured', true)
        .order('start_time', { ascending: true })
        .limit(6)

      if (error) throw error

      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching featured activities:', error)
      toast.error('获取推荐活动失败')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    activities,
    isLoading
  }
}