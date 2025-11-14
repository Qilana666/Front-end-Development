import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Book {
  id: string
  title: string
  author: string
  illustrator: string | null
  cover_image: string
  age_range_min: number | null
  age_range_max: number | null
  price: number
  rating: number
  description: string | null
  is_featured: boolean
}

interface Activity {
  id: string
  title: string
  description: string
  activity_type: 'story_telling' | 'craft' | 'outdoor' | 'drama' | 'reading_club'
  cover_image: string | null
  start_time: string
  end_time: string
  age_range_min: number | null
  age_range_max: number | null
  price: number
  city: string | null
  district: string | null
  is_featured: boolean
}

interface AppState {
  // 首页数据
  featuredBooks: Book[]
  featuredActivities: Activity[]
  banners: Array<{
    id: string
    title: string
    image: string
    link: string
    type: 'book' | 'activity' | 'special'
  }>
  
  // 绘本馆数据
  books: Book[]
  bookCategories: string[]
  selectedCategory: string | null
  searchQuery: string
  
  // 全局状态
  isLoading: boolean
  error: string | null
  
  // 方法
  setFeaturedBooks: (books: Book[]) => void
  setFeaturedActivities: (activities: Activity[]) => void
  setBanners: (banners: AppState['banners']) => void
  setBooks: (books: Book[]) => void
  setBookCategories: (categories: string[]) => void
  setSelectedCategory: (category: string | null) => void
  setSearchQuery: (query: string) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 首页数据
      featuredBooks: [],
      featuredActivities: [],
      banners: [],
      
      // 绘本馆数据
      books: [],
      bookCategories: [],
      selectedCategory: null,
      searchQuery: '',
      
      // 全局状态
      isLoading: false,
      error: null,
      
      // 方法
      setFeaturedBooks: (books) => set({ featuredBooks: books }),
      setFeaturedActivities: (activities) => set({ featuredActivities: activities }),
      setBanners: (banners) => set({ banners }),
      setBooks: (books) => set({ books }),
      setBookCategories: (categories) => set({ bookCategories: categories }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'huibendao-app',
      partialize: (state) => ({
        selectedCategory: state.selectedCategory,
        searchQuery: state.searchQuery,
      }),
    }
  )
)