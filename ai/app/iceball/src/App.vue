<template>
  <div class="container">
    <div class="input">
      <div class="file-input">
        <input 
          type="file" 
          ref="uploadImage" 
          accept="image/*"
          @change="updateImageData"
          required
        />
      </div>
      <img :src="imgPreview" alt="" v-if="imgPreview"/> 
      <div class="settings">
        <div class="selection">
          <label >队服编号:</label>
          <input type="number" v-model="uniform_number"/>
        </div>
        <div class="selection">
          <label >队服颜色:</label>
          <select v-model="uniform_color">
            <option value="红">红</option>
            <option value="蓝">蓝</option>
            <option value="绿">绿</option>
            <option value="粉">粉</option>
          </select>
        </div>
        <div class="selection">
          <label >位置：</label>
          <select v-model="position">
            <option value="0">守门员</option>
            <option value="1">前锋</option>
            <option value="2">后卫</option>
        <div class="selection">
            <label>持杆：</label>
            <select v-model="shooting_hand">
              <option value="0">左手</option>
              <option value="1">右手</option>
            </select>
          </div>
          <div class="selection">
            <label>风格：</label>
            <select v-model="style">
              <option value="写实">写实</option>
              <option value="乐高">乐高</option>
              <option value="国漫">国漫</option>
              <option value="日漫">日漫</option>
              <option value="油画">油画</option>
              <option value="涂鸦">涂鸦</option>
              <option value="素描">素描</option>
            </select>
          </div>
          </select>
        </div>
      </div>
      <div class="generate">
        <button @click="generate">生成</button>
      </div>
    </div>
    <div class="output">
      <div class="generated">
        <img :src="imgurl" alt="" v-if="imgurl"/>
        <div v-if="status">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
// script +setup 启用vue3 是vue3 最好的代码组织方式
// composition api组合
// 直接在script setup中定义函数
// 用于标记一个DOM对象，如果要做dom编程就用ref
// 未挂载前是null,uploadImage templte中的ref绑定的dom对象  
const uniform_number = ref(10);
const uniform_color = ref('红');
const position = ref(0);
const shooting_hand = ref(0);
const style = ref('写实');
// 聚焦于数据状态
const status = ref('');   //空-> 上传中 -> 生成中-> 生成成功
const imgurl = ref('');
// 生成图片模块
const generate = async() => { 
  status.value = '图片上传中...';
}
//图片预览模块
const uploadImage = ref(null);   //响应的是个dom对象
const imgPreview = ref(''); //声明了响应式对象

// null->dom 对象 变化
onMounted(() => {
  console.log(uploadImage.value);
})

// const updateImageData = (e) => {
//   console.log(e)
// }
const updateImageData = () => {
  // html5 文件对象
  console.log(uploadImage.value.files);
  const input = uploadImage.value;
  if(!input.files||input.files.length===0){  //不是规定的文件类型 或者 没有选择文件
    return;
  }
  const file = input.files[0];  //文件对象  html5 新特性
  console.log(file);
  //FileReader 文件阅读对象
  const reader = new FileReader();
  reader.readAsDataURL(file);  //在读的时候返回一个临时的url   异步的
  reader.onload = (e) => {  //异步的任务，事件监听  读完了之后
    // console.log(e.target.result); //image/png;base64   base64 是图片的特殊url
    imgPreview.value = e.target.result; 
  }
}
</script>

<style  scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    height: 100vh;
    font-size: .85rem;
  }
  
  .preview {
    max-width: 300px;
    margin-bottom: 20px;
  }
  
  .settings {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    margin-top: 1rem;
  }
  
  .selection {
    width: 100%;
    text-align: left;
  }
  
  .selection input {
    width: 50px;
  }
  
  .input {
    display: flex;
    flex-direction: column;
    min-width: 330px;
  }
  
  .file-input {
    display: flex;
    margin-bottom: 16px;
  }
  
  .output {
    margin-top: 10px;
    min-height: 300px;
    width: 100%;
    text-align: left;
  }
  
  button {
    padding: 10px;
    min-width: 200px;
    margin-left: 6px;
    border: solid 1px black;
  }
  
  .generate {
    width: 100%;
    margin-top: 16px;
  }
  
  .generated {
    width: 400px;
    height: 400px;
    border: solid 1px black;
    position: relative;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
  }
  
  .output img {
    width: 100%;
  }
</style>