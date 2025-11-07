# 盒子模型 box-sizing

- 盒子在页面(文档流)的占位

  - 内容 wxh 全部
  - 内边距 padding
  - 边框 border
  - 外边距 margin

  - position 定位

- 标准盒模型

  - content-sizing 盒模型的计算方式=内容+padding+border+margin
    600-10-2-20=568px
    css 默认盒子的宽高并不是盒子在页面的大小，只是内容的大小
    由内容+padding+border+margin=盒子在页面的大小
    box-sizing: content-box;
    width=内容的宽度
    height=内容的高度

- 怪异盒模型
  box-sizing: border-box;
  <!-- 元素的 width 和 height 应用于内容区域、内边距和边框。 -->
  box-sizing=内容+padding+border=w/h
  盒子的计算
