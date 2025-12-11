<template>
  <div>
    <!-- 数据绑定 -->
    <h2>{{ title }}</h2>
    <!-- 双向数据绑定 -->
    <!-- //按下回车键添加任务 -->
    <!-- @  是v-bind的缩写 不用写addEventListener 直接写事件名 -->
    <!-- @event-name.enter="addTodo" 监听键盘输入，当按下回车的时候-->
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <!-- 条件渲染指令 -->
    <ul v-if="todos.length">
      <!-- key 唯一属性 -->
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <!-- : 表示v-bind缩写 js表达式 -->
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
        <!-- 类名是动态的 当todo.done 为true 时添加done类名 否则不添加 -->
        <!-- vue 会一定的学习 api对用户非常友好 ，好上手  react 也有类似的api  但是难-->
      </li>
    </ul>
    <div v-else>暂无计划</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />

      <!-- 展示未完成任务的数量 -->
      <!-- 过滤出未完成的任务  数组的长度就是未完成任务的数量 -->
      <!-- {{ 数据绑定 表达式的结果绑定 }} -->
      <!-- {{ todos.filter(todo=>!todo.done).length }} -->
      {{ active }}
      /
      {{ todos.length }}
    </div>
  </div>
</template>

<script setup>
//业务是页面上要动态展示标题，且可以编辑标题
//vue focus于标题数据业务 修改数据 余下的dom更新vue  替我们做了
//setup vue3 composition API 组合式API
//不是setup 是options API 选项式API
import { ref, computed } from "vue";
//响应式数据
const title = ref("Todos任务清单");
const todos = ref([
  {
    id: 1,
    title: "吃饭",
    done: false,
  },
  {
    id: 2,
    title: "睡觉",
    done: false,
  },
  {
    id: 3,
    title: "打豆豆",
    done: false,
  },
  {
    id: 4,
    title: "学习vue3",
    done: false,
  },
]);

//依赖于todos 响应式数据的 计算属性
//形式上是函数 （计算过程），计算结果（计算属性）返回
//也是响应式的 依赖于todos
//computed 缓存 性能优化 只有todos 变化时才会重新计算
const active = computed(() => {
  return todos.value.filter((todo) => !todo.done).length;
});

//全选
//computed 高级技巧
//get set 属性的概念
const allDone = computed({
  get() {
    return todos.value.every((todo) => todo.done);
  },
  set(value) {
    todos.value.forEach((todo) => (todo.done = value));
  },
});

//添加任务
const addTodo = () => {
  //focus 数据业务
  if (!title.value) return;
  todos.value.push({
    id: todos.value.length + 1,
    title: title.value,
    done: false,
  });
  //清空输入框
  title.value = "";
};
</script>

<style>
.done {
  color: gray;
  text-decoration: line-through;
}
</style>

