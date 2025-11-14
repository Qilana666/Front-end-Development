# 绘本岛部署指南

## 🚀 快速部署

### 1. 环境准备

确保已安装：
- Node.js 18+
- npm 或 pnpm
- Git

### 2. 克隆项目

```bash
git clone <your-repository-url>
cd huibendao
```

### 3. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 4. 配置环境变量

创建 `.env` 文件：

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME=绘本岛
VITE_APP_ENV=production
```

### 5. 数据库设置

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 复制项目 URL 和 Anon Key 到 `.env` 文件
3. 运行数据库初始化脚本：

```bash
# 在项目根目录执行
supabase db push supabase/migrations/20240113000000_initial_schema.sql
```

### 6. 构建项目

```bash
npm run build
# 或
pnpm build
```

### 7. 部署到 Vercel

#### 方法一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/huibendao)

#### 方法二：手动部署

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel --prod
```

### 8. 配置域名

在 Vercel 控制台中：
1. 添加自定义域名
2. 配置 DNS 解析
3. 启用 HTTPS

## 📋 功能验证清单

部署完成后，请验证以下功能：

### ✅ 基础功能
- [ ] 首页加载正常
- [ ] 页面导航流畅
- [ ] 移动端适配良好
- [ ] 加载状态显示正常

### ✅ 用户功能
- [ ] 手机号登录/注册
- [ ] 微信登录（如配置）
- [ ] 用户资料编辑
- [ ] 孩子档案管理

### ✅ 绘本功能
- [ ] 绘本列表展示
- [ ] 绘本详情查看
- [ ] 搜索和筛选功能
- [ ] 收藏功能

### ✅ 购物功能
- [ ] 添加商品到购物车
- [ ] 购物车管理
- [ ] 下单流程
- [ ] 订单查看

### ✅ 阅读功能
- [ ] 阅读记录添加
- [ ] 阅读打卡
- [ ] 阅读统计

### ✅ 活动功能
- [ ] 活动列表展示
- [ ] 活动详情查看
- [ ] 活动报名（如配置）

## 🔧 高级配置

### Supabase 配置

#### 启用短信验证
在 Supabase 控制台中：
1. 进入 Authentication > Providers
2. 启用 Phone 提供商
3. 配置短信服务商（如 Twilio）

#### 配置存储
1. 进入 Storage > Buckets
2. 创建 `book-covers` 存储桶
3. 设置适当的访问权限

#### 配置 RLS 规则
确保所有表都有适当的行级安全策略，详见 `supabase/migrations/20240113000000_initial_schema.sql`

### 性能优化

#### 图片优化
- 使用 WebP 格式
- 启用图片懒加载
- 配置 CDN 加速

#### 代码分割
- 路由级别的代码分割
- 组件懒加载
- 第三方库按需加载

#### 缓存策略
- 静态资源缓存
- API 响应缓存
- 图片资源缓存

## 🛠️ 故障排除

### 常见问题

#### 1. 构建失败
检查 TypeScript 错误：
```bash
npm run typecheck
```

#### 2. 部署失败
检查环境变量配置是否正确

#### 3. 数据库连接失败
确认 Supabase URL 和 Anon Key 是否正确

#### 4. 图片加载失败
检查图片 URL 和存储桶权限

### 日志查看

Vercel 部署日志：
```bash
vercel logs
```

## 📞 技术支持

如遇到问题，请提供以下信息：
- 错误截图
- 控制台错误信息
- 部署日志
- 环境配置（隐藏敏感信息）

## 📈 后续优化

### 功能增强
- [ ] 支付集成（微信支付、支付宝）
- [ ] 推送通知
- [ ] 社交分享
- [ ] 阅读社区

### 性能提升
- [ ] PWA 支持
- [ ] 离线缓存
- [ ] 图片压缩
- [ ] CDN 加速

### 数据分析
- [ ] 用户行为分析
- [ ] 阅读数据统计
- [ ] 销售数据报表

---

**祝部署顺利！让绘本岛为更多家庭带来温馨的亲子阅读时光。** 📖✨