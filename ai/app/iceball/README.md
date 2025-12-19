# AI 应用之冰球

## 前端应用 Vue3

- 活动型的应用
  冰球协会，上传宠物照片，生成冰球运动员的形象照片
  有趣，分享到朋友圈
- vue 主要收集表单数据，上传图片等
- ai 能力 通过调用 coze 工作流的 api 实现

## 数据业务

- 立即显示上传文件的预览
  - 好的用户体验，图片可能有点大，上传需要些时间，预览图可以让用户知道在干什么
  - 聚焦于数据状态（值和改变）
    响应式数据 imgPreview img:src="imgPreview"
    filereader readasDataURL 方 onload 读完了 赋值给 imgPreview
    google 推出了 base64 编码， 可以将图片转化为二进制字符串
