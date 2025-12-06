<script setup>
// es6 解构
// vue太复杂， 目前只需要ref 
import { ref } from 'vue'
// 模版需要消费的数据
// 响应式数据
// 在数据**改变**的时候，模版（响应了）会自动更新
// count 是value 为111的响应式对象
// let count = ref(111);
// console.log(count);
// setTimeout(() => {
//   count.value = 222;
// }, 2000)
// v-model 指令 响应式绑定表单的数据
// v-model 双向数据绑定指令
const question = ref('讲一个喜洋洋和灰太狼的故事，20字')
const stream = ref(true)
const content = ref("") // 单向绑定  主要的

// 调用LLM
const askLLM = async () => { 
  // question 可以省.value  getter
  if (!question.value) {
    console.log('question 不能为空');
    return 
  }
  // 用户体验
  content.value = '思考中...';
  // 请求行 
  // 请求头
  // 请求体
  const endpoint = 'https://api.deepseek.com/chat/completions';
  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json'
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'deepseek-chat',
      stream: stream.value,
      messages: [
        {
          role: 'user',
          content: question.value
        }
      ]
    })
  })
  if (stream.value) {
  // 流式输出
    content.value = ""; // 把上次的生成清空
    // html5 流式响应体
    // 响应体的读对象
    const reader = response.body?.getReader();
    // 流出来的是二进制流  buffer 
    const decoder = new TextDecoder();
    let done = false;  // 流是否结束 没有
    let buffer = '';
    while(!done) { // 只要没有完成，就一直拼接buffer
      // 解构的同时 重命名 
      const { value, done: doneReading } = await reader?.read()
      console.log(value, doneReading);
      done = doneReading;
      // chunk 内容块 包含多行data: 有多少行不确定
      // data: {} 能不能传完也不知道 
      const chunkValue = buffer + decoder.decode(value);
      console.log(chunkValue)
      buffer = '';
      const lines = chunkValue.split('\n')
        .filter(line => line.startsWith('data: '))
      for (const line of lines) {
        const incoming = line.slice(6); // 干掉数据标志
        if (incoming === '[DONE]') {
          done = true;
          break;
        }
        try {
          // llm 流式生成， tokens 长度不定的 
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if (delta) {
            content.value += delta;
          }
        } catch(err) {
          // JSON.parse 解析失败 
          buffer += `data: ${incoming}`
        }
      }
    }

  } else {
    const data = await response.json();
    console.log(data);
    content.value = data.choices[0].message.content;
  }
}
</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label>
      <input class="input" v-model="question"/>
      <button @click="askLLM">提交</button>
    </div>
    <div class="output">
      <div>
        <label>Streaming</label>
        <input type="checkbox" v-model="stream" />
        <div>{{content}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  /* 主轴、次轴 */
  align-items: start;
  justify-content: start;
  height: 100vh;
  font-size: 0.85rem;
}
.input {
  width: 200px;
}
button {
  padding: 0 10px;
  margin-left: 6px;
}
.output {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}
</style>