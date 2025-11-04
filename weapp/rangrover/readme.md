# 路虎小程序

- 4s 店扫码
- 微信转发
- 介绍产品
- 预约试驾

## 数据驱动界面

- js data{
  slides:[{
  {
  "id": 3,
  "header": "全新揽胜星脉",
  "sub_header": "Range Rover",
  "description": "标新立异的前卫揽胜。",
  "image": "https://resources.ninghao.net/landrover/velar-1.jpg"
  },
  {
  "id": 6,
  "header": "发现神行",
  "sub_header": "Discovery",
  "description": "发现的绝佳时刻。",
  "image": "https://resources.ninghao.net/landrover/discovery-sport-1.jpg"
  }
  }]
  }

## css 可以借鉴的

- 小程序样式分成全局样式(共享)和页面（独有）样式
  当你发现在多个页面 重复了代码，可以考虑提取到全局样式。
- 多个样式组合一起用
  把样式拆的足够细，有利于**复用**
  .section
  .hero.white
