// localstorage 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  doLogin
} from '@/api/user'
import type { User } from '@/types/index'
import type { Credentail } from '@/types/index';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogin: boolean;
  login: (credentials: Credentail) => Promise<void>;
  logout: () => void;
}

// 高阶函数 柯里化
export const useUserStore = create<UserState>()(
  persist((set) => ({ // state 对象
    accessToken:null,
    refreshToken:null,
    user: null,
    isLogin: false,
    login: async ({ name, password }) => {
      const res = await doLogin({name, password});
      console.log(res, '////');
      const {
        access_token,
        refresh_token,
        user
      } = res;
      // console.log(user, access_token, refresh_token)
      set({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
        isLogin: true
      })
    },
    logout: () => {
      set({
        user: null,
        isLogin: false,
        accessToken: null,
        refreshToken: null
      })
    }
  }), {
    name: 'user-store',
    partialize: (state) => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      user: state.user,
      isLogin: state.isLogin
    })
  })
)