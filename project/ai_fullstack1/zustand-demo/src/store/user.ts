import { create } from 'zustand';
// persist 是 Zustand 的一个插件，它能让状态在页面刷新后依然存在（如果不加这个，刷新页面后状态会重置为初始值）
import { persist } from 'zustand/middleware';
import type { User } from '../types';

// 持久化存储功能的用户状态管理器
interface UserState{
  isLoggin: boolean;  
  login: (user: { username: string; password: string }) => void;
  logout: () => void;
  user: User|null;
}

export const useUserStore = create<UserState>()(
  persist((set) => ({
    isLoggin: false,
    login: (user) => set({ isLoggin: true, user: { ...user, id: 1 } }),
    logout: () => set({ isLoggin: false, user: null }),
    user: null,
  }),
    {
    name: 'user',
    }
  ),
)