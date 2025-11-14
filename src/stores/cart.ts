import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  type: 'book' | 'activity'
  title: string
  cover_image: string
  price: number
  quantity: number
  selected: boolean
  metadata?: {
    age_range?: string
    date?: string
    location?: string
  }
}

interface CartState {
  items: CartItem[]
  isLoading: boolean
  addItem: (item: Omit<CartItem, 'quantity' | 'selected'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleSelect: (id: string) => void
  selectAll: (selected: boolean) => void
  clearCart: () => void
  getSelectedItems: () => CartItem[]
  getTotalPrice: () => number
  getSelectedCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id)
        if (existingItem) {
          set(state => ({
            items: state.items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1, selected: true }]
          }))
        }
      },
      
      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set(state => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },
      
      toggleSelect: (id) => {
        set(state => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, selected: !item.selected } : item
          )
        }))
      },
      
      selectAll: (selected) => {
        set(state => ({
          items: state.items.map(item => ({ ...item, selected }))
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getSelectedItems: () => {
        return get().items.filter(item => item.selected)
      },
      
      getTotalPrice: () => {
        return get().items
          .filter(item => item.selected)
          .reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getSelectedCount: () => {
        return get().items.filter(item => item.selected).length
      }
    }),
    {
      name: 'huibendao-cart',
    }
  )
)