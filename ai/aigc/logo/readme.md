# coze logo 生成

- 选择合适的模型
  dall-e-3
- prompt
- bootstrap 样式库
  .container PC layout 中间宽度，左右 margin:auto;
  .form-group 每个表单元素占满宽度

## HTML5 Form 表单

- 给必填字段 required 属性
- placeholder 提示用户输入 有利于表单的可读性 把对象当小白
- label for + input#id 为了盲人而来 大厂需要无障碍访问（关联表单元素和标签 点击标签也可以聚焦到输入框）
- 点击按钮，表单提交
- form 默认提交到 action 为空就是当前页面
  - event.preventDefault() 阻止默认事件

## apifox

#AIGC LLM 的本质

- node openai completions
- llm 发起的**api**接口调用 前端界面 api LLM
  - POST 请求
    apikey 加密

## 基础

- input#myInput {
  color: blue;
  background-color: lightgray;
  width: 200px;
  }
  id 为 myInput 的这个<input>输入框里的文字就会是蓝色，背景变成浅灰色，宽度也变成 200 像素啦 。所以 input#id 是一种精准定位<input>元素并为其添加样式的方式 。
