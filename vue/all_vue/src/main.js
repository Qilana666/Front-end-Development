// vue createApp(App) 创建了一个App实例
import { createApp } from 'vue'
import './style.css'
import App from './App.vue' 
// 引入路由模块
import router from './router'
// vue 创建了一个现代前端应用
// 组件化，响应式
// 跟DOM编程say byebye
createApp(App)
// 挂载路由模块 启用路由
.use(router)  
// 挂载在#app上
  .mount('#app') // 挂载到id为app的元素上
