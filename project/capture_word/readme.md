# 拍照记单词

## AI 时代

- vibe coding
  代码和项目开发变得快速且靠谱
- _opc_ 一人公司
  one person company
  创意、规划、商业、共情
  AI产品经理

## 单词类APP

- 市场调研
  - 百词斩
    - 细分领域 背单词
    - 单词和形象的图片结合
  - 扇贝
    智能间隔重复算法
    精准规划复习时间，确保单次在即将遗忘时被强化，长期记忆

## 大模型

- 互联网所有的产品值得用ai重新做一遍
  - AIGC
  - Agent
- 出海
- 拍照记单词
  - 多邻国
  - 产品点？
  - 需求
  - 场景
    跨国生活、旅游、点餐
  - 痛点
    足够痛 强需求

## 产品原型

- 拍照/上传图片
- 调用kimi 接口，解析单词和例句
- 点击播放按钮
- 最核心功能的表达，这么交互的，有哪些页面

## 设计稿

## 技术调研

### 大模型

- 多模态模型 kimi-shot
  moonshot-v1-8k-version-preview
- 文本 -> 语音 TTS（text to speech）

### 技术栈

- 前端 vue3 +ts
- 后端 nestjs

## 开发

### 产品亮点

- 无障碍访问
  label for + input#id
  帮助使用读屏器的盲人使用
  input[type="file"] 比较难控制样式
  display:none, for id 样式控制
