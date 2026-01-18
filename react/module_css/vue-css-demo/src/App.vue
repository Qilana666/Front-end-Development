<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1 class="txt">Hello world in App</h1>
    <h2 class="txt2">一点点</h2>
    <HelloWorld/>
  </div>

</template>

<!-- 加上scoped 后，HelloWorld.vue 中的 txt 类名不会影响到 App.vue 中的 txt 类名 -->
 <!-- 一个scope 对应一个id -->
<style scoped>
.txt {
  color: red;
}
.txt2{
  color:pink;
}
</style>
