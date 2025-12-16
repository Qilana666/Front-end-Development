<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <!-- app.use(router)之后 vue-router 带给我们的全局组件 -->
          <li><router-Link to="/Home">Home</router-Link></li>
          <li><router-Link to="/about">About</router-Link></li>
        </ul>
      </nav>
    </header>
    <main>
      <!-- 多个页面的占位符 -->
      <router-view>
        
      </router-view> 
    </main>
    <footer>

    </footer>
  </div>
</template>

<style scoped>

</style>
