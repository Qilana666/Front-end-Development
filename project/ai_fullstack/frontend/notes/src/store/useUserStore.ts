// localstorage 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  doLogin
} from '@/api/user';
import type { User } from '@/types/index'
import type { Credential } from '@/types/index'



interface UserState{
  user: User | null;
  isLogin: boolean;
  login: (credentials:Credential) => Promise<void>;
}
//高阶函数 柯里化
export const useUserStore = create<UserState>()(
  persist((set) =>( {  //state 对象
    user: null,
    isLogin: false,
    login: async ({name,password}) => {
      const res = await doLogin({ name, password });
      console.log(res,'/////')
      // const { token, user } = res.user;
    }
  }), {
    name: 'user-store',
    partialize: (state) => ({
      user: state.user,
      isLogin:state.isLogin
    })
  })
    
)