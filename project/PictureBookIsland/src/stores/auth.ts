import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  phone: string | null
  email: string | null
  nickname: string | null
  avatar_url: string | null
  gender: 'male' | 'female' | 'other' | null
  birthday: string | null
  province: string | null
  city: string | null
  district: string | null
  address_detail: string | null
  membership_level: 'bronze' | 'silver' | 'gold' | 'platinum'
  total_spent: number
}

interface Child {
  id: string
  user_id: string
  name: string
  gender: 'male' | 'female' | null
  birth_date: string
  avatar_url: string | null
  interests: string[] | null
  reading_level: number
  favorite_genres: string[] | null
  notes: string | null
  is_active: boolean
}

interface AuthState {
  user: User | null
  children: Child[]
  selectedChildId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setChildren: (children: Child[]) => void
  setSelectedChildId: (childId: string | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      children: [],
      selectedChildId: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user }),
      setChildren: (children) => set({ children }),
      setSelectedChildId: (selectedChildId) => set({ selectedChildId }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ 
        user: null, 
        children: [], 
        selectedChildId: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'huibendao-auth',
    }
  )
)