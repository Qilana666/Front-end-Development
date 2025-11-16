# 绘本岛 - 亲子阅读与活动平台

一个专为0-12岁中国家庭设计的温馨亲子阅读与活动平台，提供精选绘本推荐、亲子活动报名、阅读记录追踪等一站式亲子教育服务。

## 🌟 项目特色

- **精选绘本库**: 海量优质绘本，按年龄段和主题分类
- **亲子活动**: 丰富的线下亲子活动，促进家庭互动
- **阅读记录**: 记录孩子阅读成长轨迹，培养阅读习惯
- **个性化推荐**: 基于孩子年龄和兴趣的智能推荐
- **温馨设计**: 温暖柔和的视觉设计，营造亲子共读氛围

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **UI框架**: Ant Design Mobile + Tailwind CSS
- **状态管理**: Zustand
- **后端**: Supabase (数据库 + 认证 + 存储)
- **部署**: Vercel

## 📦 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 环境配置

1. 复制 `.env.example` 到 `.env`
2. 配置 Supabase 连接信息：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 开发运行

```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:5173 查看应用

### 构建部署

```bash
npm run build
# 或
pnpm build
```

## 🗄️ 数据库设置

### 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 复制项目 URL 和 Anon Key 到 `.env` 文件
3. 运行数据库初始化脚本：

```bash
# 在项目根目录执行
supabase db push supabase/migrations/20240113000000_initial_schema.sql
```

### 数据库结构

- **users**: 用户表（手机号/邮箱登录）
- **children**: 孩子档案表
- **books**: 绘本信息表
- **activities**: 亲子活动表
- **reading_records**: 阅读记录表
- **orders**: 订单表
- **cart_items**: 购物车表
- **addresses**: 收货地址表
- **reviews**: 评价表
- **favorites**: 收藏表

## 📱 功能模块

### 核心页面

- **首页**: 轮播图、热门绘本、推荐活动
- **绘本馆**: 绘本分类浏览、搜索筛选
- **亲子活动**: 活动展示、报名参与
- **阅读记录**: 阅读足迹、打卡记录
- **用户中心**: 个人资料、孩子档案、订单管理
- **购物车**: 商品管理、结算流程

### 特色功能

- 📚 **智能推荐**: 基于孩子年龄和阅读历史推荐绘本
- 🎯 **阅读打卡**: 培养阅读习惯，记录成长轨迹
- 🎨 **亲子活动**: 线下活动报名，增进亲子关系
- 🛒 **便捷购物**: 一键下单，快速配送
- 💬 **用户评价**: 真实评价，帮助选择

## 🎨 设计规范

### 色彩系统

- **主色调**: 温暖橙色 (#FF8C42) - 温馨亲子氛围
- **辅助色**: 天空蓝 (#87CEEB) - 清新阅读体验
- **点缀色**: 
  - 柔和粉色 (#FFB6C1)
  - 清新绿色 (#98FB98) 
  - 温暖黄色 (#FFE4B5)

### 字体系统

- 中文: PingFang SC, Hiragino Sans GB, Microsoft YaHei
- 数字: SF Pro Display, Roboto

### 组件规范

- 圆角设计: 8-16px 圆角，营造柔和感
- 阴影效果: 柔和阴影，增加层次感
- 动效设计: 温和过渡，避免过度刺激

## 🔧 开发指南

### 代码规范

- 使用 TypeScript 严格模式
- 组件文件小于 300 行
- 使用自定义 hooks 复用逻辑
- 遵循 React 最佳实践

### 文件结构

```
src/
├── components/          # 通用组件
├── routes/             # 页面组件
├── hooks/               # 自定义 hooks
├── stores/              # 状态管理
├── lib/                 # 工具库
├── utils/               # 工具函数
└── types/               # 类型定义
```

### 命名规范

- 组件: PascalCase (如: `BookCard`)
- 函数: camelCase (如: `getBookDetails`)
- 常量: UPPER_SNAKE_CASE (如: `API_ENDPOINT`)
- 文件: 小写连字符 (如: `book-card.tsx`)

## 🚀 部署说明

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/huibendao)

### 手动部署

1. 构建项目：`npm run build`
2. 安装 Vercel CLI：`npm i -g vercel`
3. 部署：`vercel --prod`

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系我们

- 邮箱: hello@huibendao.com
- 微信: huibendao2024
- 客服热线: 400-123-4567

---

**让阅读成为亲子时光中最美好的陪伴** 📖✨