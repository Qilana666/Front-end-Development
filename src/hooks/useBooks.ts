import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tables } from '@/lib/supabase'
import { toast } from 'sonner'

export function useBooks(category?: string, searchQuery?: string) {
  const [books, setBooks] = useState<Tables<'books'>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [category, searchQuery])

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      setError(null)

      let query = supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`)
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) throw supabaseError

      setBooks(data || [])
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('获取绘本列表失败')
      toast.error('获取绘本列表失败')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    books,
    isLoading,
    error,
    refetch: fetchBooks
  }
}

export function useFeaturedBooks() {
  const [books, setBooks] = useState<Tables<'books'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchFeaturedBooks()
  }, [])

  const fetchFeaturedBooks = async () => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(10)

      if (error) throw error

      setBooks(data || [])
    } catch (error) {
      console.error('Error fetching featured books:', error)
      toast.error('获取推荐绘本失败')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    books,
    isLoading
  }
}