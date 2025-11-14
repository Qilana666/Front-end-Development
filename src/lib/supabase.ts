import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string | null
          email: string | null
          wechat_openid: string | null
          nickname: string | null
          avatar_url: string | null
          gender: 'male' | 'female' | 'other' | null
          birthday: string | null
          province: string | null
          city: string | null
          district: string | null
          address_detail: string | null
          is_verified: boolean
          membership_level: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_spent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          phone?: string | null
          email?: string | null
          wechat_openid?: string | null
          nickname?: string | null
          avatar_url?: string | null
          gender?: 'male' | 'female' | 'other' | null
          birthday?: string | null
          province?: string | null
          city?: string | null
          district?: string | null
          address_detail?: string | null
          is_verified?: boolean
          membership_level?: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          email?: string | null
          wechat_openid?: string | null
          nickname?: string | null
          avatar_url?: string | null
          gender?: 'male' | 'female' | 'other' | null
          birthday?: string | null
          province?: string | null
          city?: string | null
          district?: string | null
          address_detail?: string | null
          is_verified?: boolean
          membership_level?: 'bronze' | 'silver' | 'gold' | 'platinum'
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          gender?: 'male' | 'female' | null
          birth_date: string
          avatar_url?: string | null
          interests?: string[] | null
          reading_level?: number
          favorite_genres?: string[] | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          gender?: 'male' | 'female' | null
          birth_date?: string
          avatar_url?: string | null
          interests?: string[] | null
          reading_level?: number
          favorite_genres?: string[] | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          author: string
          illustrator: string | null
          translator: string | null
          publisher: string | null
          publish_date: string | null
          isbn: string | null
          description: string | null
          cover_image: string
          preview_images: string[] | null
          age_range_min: number | null
          age_range_max: number | null
          pages: number | null
          price: number
          stock_quantity: number
          category: string | null
          subcategory: string | null
          tags: string[] | null
          language: string
          binding_type: 'hardcover' | 'paperback' | 'board_book' | 'pop_up' | null
          weight: number | null
          dimensions: string | null
          rating: number
          review_count: number
          sales_count: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          author: string
          illustrator?: string | null
          translator?: string | null
          publisher?: string | null
          publish_date?: string | null
          isbn?: string | null
          description?: string | null
          cover_image: string
          preview_images?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          pages?: number | null
          price: number
          stock_quantity?: number
          category?: string | null
          subcategory?: string | null
          tags?: string[] | null
          language?: string
          binding_type?: 'hardcover' | 'paperback' | 'board_book' | 'pop_up' | null
          weight?: number | null
          dimensions?: string | null
          rating?: number
          review_count?: number
          sales_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          author?: string
          illustrator?: string | null
          translator?: string | null
          publisher?: string | null
          publish_date?: string | null
          isbn?: string | null
          description?: string | null
          cover_image?: string
          preview_images?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          pages?: number | null
          price?: number
          stock_quantity?: number
          category?: string | null
          subcategory?: string | null
          tags?: string[] | null
          language?: string
          binding_type?: 'hardcover' | 'paperback' | 'board_book' | 'pop_up' | null
          weight?: number | null
          dimensions?: string | null
          rating?: number
          review_count?: number
          sales_count?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          title: string
          description: string
          activity_type: 'story_telling' | 'craft' | 'outdoor' | 'drama' | 'reading_club'
          organizer: string
          venue_name: string | null
          address: string
          province: string | null
          city: string | null
          district: string | null
          longitude: number | null
          latitude: number | null
          start_time: string
          end_time: string
          age_range_min: number | null
          age_range_max: number | null
          max_participants: number
          current_participants: number
          price: number
          original_price: number | null
          cover_image: string | null
          detail_images: string[] | null
          requirements: string | null
          what_to_bring: string | null
          cancellation_policy: string | null
          rating: number
          review_count: number
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          activity_type: 'story_telling' | 'craft' | 'outdoor' | 'drama' | 'reading_club'
          organizer: string
          venue_name?: string | null
          address: string
          province?: string | null
          city?: string | null
          district?: string | null
          longitude?: number | null
          latitude?: number | null
          start_time: string
          end_time: string
          age_range_min?: number | null
          age_range_max?: number | null
          max_participants: number
          current_participants?: number
          price: number
          original_price?: number | null
          cover_image?: string | null
          detail_images?: string[] | null
          requirements?: string | null
          what_to_bring?: string | null
          cancellation_policy?: string | null
          rating?: number
          review_count?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          activity_type?: 'story_telling' | 'craft' | 'outdoor' | 'drama' | 'reading_club'
          organizer?: string
          venue_name?: string | null
          address?: string
          province?: string | null
          city?: string | null
          district?: string | null
          longitude?: number | null
          latitude?: number | null
          start_time?: string
          end_time?: string
          age_range_min?: number | null
          age_range_max?: number | null
          max_participants?: number
          current_participants?: number
          price?: number
          original_price?: number | null
          cover_image?: string | null
          detail_images?: string[] | null
          requirements?: string | null
          what_to_bring?: string | null
          cancellation_policy?: string | null
          rating?: number
          review_count?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reading_records: {
        Row: {
          id: string
          user_id: string
          child_id: string
          book_id: string
          reading_date: string
          reading_duration: number | null
          rating: number | null
          notes: string | null
          photos: string[] | null
          is_finished: boolean
          finished_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          child_id: string
          book_id: string
          reading_date: string
          reading_duration?: number | null
          rating?: number | null
          notes?: string | null
          photos?: string[] | null
          is_finished?: boolean
          finished_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          child_id?: string
          book_id?: string
          reading_date?: string
          reading_duration?: number | null
          rating?: number | null
          notes?: string | null
          photos?: string[] | null
          is_finished?: boolean
          finished_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]