<script setup>
import {
  ref,
  onMounted //挂载之后
 } from 'vue'; //响应式api 将数据包装成响应式对象
//数据
// const users = ref([
//   {
//     id: 1,
//     name: '张三',
//     email: 'zhangsan@example.com'
//   },
//   {
//     id: 2,
//     name: '李四',
//     email: 'lisi@example.com'
//   },
//   {
//     id: 3,
//     name: '王五',
//     email: 'wangwu@example.com'
//   }
// ])
// setTimeout(() => {
//   users.value.push({
//     id: 4,
//     name: '赵六',
//     email: 'zhaoliu@example.com'
//   })
// }, 3000);
const users=ref=([])
onMounted(() => {
  console.log('页面挂载完成');
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      users.value = data
    })
})
</script>

<template>
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>email</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
    </tr>
  </tbody>
</table>
</template>

<style scoped>

</style>
