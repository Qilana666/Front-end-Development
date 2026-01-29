import { create } from 'zustand';
// 状态存储的规矩和修改的方式，专业管理状态
// 企业做大做强，请管理财务 状态以及修改状态的规矩
// 重要的数据状态

// 初始化： 创建一个仓库，里面放了一个数字 count，初始值为 0。
// 对外提供接口： 提供了三个“按钮”（函数）：increment、decrement、reset。
// 修改机制： 任何组件都可以拿到这个仓库里的 count 显示出来，也可以调用那三个函数来修改它。一旦修改，所有用到这个 count 的组件都会自动更新。

// 全局状态管理器的 计数器
interface CounterState{
  count: number;
  increment: () => void;  
  decrement: () => void;
  reset: () => void;
}
export const useCountStore = create<CounterState>((set) => ({
  //列出状态
  // 状态要怎么改？
  count: 0,
  increment: () => set((state ) => ({ count: state.count + 1 })),
  decrement: () => set((state ) => ({ count: state.count - 1 })),
  reset:()=>set({count:0})
}))