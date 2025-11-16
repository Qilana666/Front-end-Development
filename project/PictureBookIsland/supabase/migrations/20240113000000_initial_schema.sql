-- 绘本岛数据库初始化脚本
-- 创建用户表
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    nickname VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建孩子档案表
CREATE TABLE IF NOT EXISTS public.children (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('男', '女')),
    birth_date DATE,
    interests TEXT[],
    reading_level VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建绘本表
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(200),
    illustrator VARCHAR(200),
    publisher VARCHAR(200),
    isbn VARCHAR(20),
    cover_image TEXT,
    images TEXT[],
    description TEXT,
    category VARCHAR(100),
    age_range VARCHAR(50),
    reading_level VARCHAR(50),
    price DECIMAL(10,2) DEFAULT 0,
    original_price DECIMAL(10,2) DEFAULT 0,
    stock_quantity INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建亲子活动表
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    cover_image TEXT,
    images TEXT[],
    category VARCHAR(100),
    age_range VARCHAR(50),
    location VARCHAR(200),
    price DECIMAL(10,2) DEFAULT 0,
    original_price DECIMAL(10,2) DEFAULT 0,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    organizer VARCHAR(200),
    contact_info VARCHAR(200),
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建阅读记录表
CREATE TABLE IF NOT EXISTS public.reading_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
    book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
    reading_time INTEGER DEFAULT 0, -- 阅读时长（分钟）
    reading_date DATE DEFAULT CURRENT_DATE,
    progress_percent INTEGER DEFAULT 0,
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    shipping_address JSONB,
    recipient_name VARCHAR(100),
    recipient_phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单项表
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    product_type VARCHAR(20) NOT NULL CHECK (product_type IN ('book', 'activity')),
    product_name VARCHAR(200) NOT NULL,
    product_image TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建收货地址表
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    detail_address TEXT NOT NULL,
    postal_code VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    product_type VARCHAR(20) NOT NULL CHECK (product_type IN ('book', 'activity')),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    content TEXT,
    images TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建收藏表
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    product_type VARCHAR(20) NOT NULL CHECK (product_type IN ('book', 'activity')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, product_type)
);

-- 创建购物车表
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    product_type VARCHAR(20) NOT NULL CHECK (product_type IN ('book', 'activity')),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id, product_type)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_age_range ON public.books(age_range);
CREATE INDEX IF NOT EXISTS idx_books_is_featured ON public.books(is_featured);
CREATE INDEX IF NOT EXISTS idx_activities_category ON public.activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_age_range ON public.activities(age_range);
CREATE INDEX IF NOT EXISTS idx_activities_status ON public.activities(status);
CREATE INDEX IF NOT EXISTS idx_reading_records_user_id ON public.reading_records(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_records_child_id ON public.reading_records(child_id);
CREATE INDEX IF NOT EXISTS idx_reading_records_book_id ON public.reading_records(book_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id, product_type);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);

-- 启用行级安全
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
CREATE POLICY "Users can view all books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Users can view all activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own children" ON public.children FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own children" ON public.children FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own reading records" ON public.reading_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reading records" ON public.reading_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (EXISTS (
  SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
));
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- 插入示例数据
INSERT INTO public.books (title, author, illustrator, publisher, cover_image, description, category, age_range, price, original_price, rating, review_count, is_featured, is_new) VALUES
('小熊宝宝绘本系列', '佐佐木洋子', '佐佐木洋子', '连环画出版社', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Little%20bear%20character%20in%20warm%20children%20book%20illustration%20style%2C%20soft%20colors%2C%20friendly%20and%20cute%20design&image_size=square', '经典婴幼儿生活启蒙绘本，培养宝宝良好生活习惯。', '生活启蒙', '0-3岁', 89.00, 128.00, 4.8, 1250, true, false),
('猜猜我有多爱你', '山姆·麦克布雷尼', '安妮塔·婕朗', '明天出版社', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Two%20rabbits%20expressing%20love%20in%20gentle%20watercolor%20style%2C%20warm%20and%20tender%20illustration&image_size=square', '经典睡前故事，表达亲子之爱的温馨绘本。', '情感教育', '3-6岁', 45.80, 58.00, 4.9, 2100, true, false),
('好饿的毛毛虫', '艾瑞·卡尔', '艾瑞·卡尔', '明天出版社', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Colorful%20caterpillar%20with%20bright%20collage%20style%20illustration%2C%20vibrant%20children%20book%20art&image_size=square', '经典洞洞书，认识数字和食物的启蒙绘本。', '认知启蒙', '2-5岁', 39.90, 49.90, 4.7, 980, false, true),
('我爸爸', '安东尼·布朗', '安东尼·布朗', '河北教育出版社', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Father%20figure%20in%20heroic%20and%20loving%20pose%2C%20warm%20family%20illustration%20style&image_size=square', '描述爸爸形象的温馨绘本，增进父子情感。', '亲情教育', '3-7岁', 42.00, 52.00, 4.8, 1560, true, false),
('大卫，不可以', '大卫·香农', '大卫·香农', '河北教育出版社', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Mischievous%20little%20boy%20in%20colorful%20and%20expressive%20illustration%20style%2C%20humorous%20children%20book%20art&image_size=square', '调皮孩子成长故事，幽默有趣的行为教育绘本。', '行为教育', '3-6岁', 38.50, 48.50, 4.6, 890, false, false);

INSERT INTO public.activities (title, description, cover_image, category, age_range, location, price, original_price, max_participants, start_time, end_time, registration_deadline, organizer, contact_info, rating, review_count, is_featured) VALUES
('亲子绘本创作工作坊', '和孩子一起创作属于自己的绘本故事，培养创造力和艺术表达能力。', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Parents%20and%20children%20creating%20art%20together%20in%20bright%20classroom%20setting%2C%20craft%20materials%20and%20drawing%20supplies%20around&image_size=square', '艺术创作', '4-10岁', '北京市朝阳区绘本馆', 198.00, 258.00, 15, '2024-01-20 14:00:00+08', '2024-01-20 16:00:00+08', '2024-01-18 18:00:00+08', '绘本岛教育团队', '010-12345678', 4.9, 45, true),
('亲子阅读分享会', '专业老师带领家长学习如何给孩子读绘本，分享阅读技巧。', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Group%20of%20parents%20and%20children%20reading%20together%20in%20cozy%20library%20setting%2C%20warm%20lighting&image_size=square', '阅读指导', '0-8岁', '上海市浦东新区社区中心', 68.00, 88.00, 25, '2024-01-25 10:00:00+08', '2024-01-25 11:30:00+08', '2024-01-24 12:00:00+08', '社区亲子教育中心', '021-87654321', 4.8, 32, false),
('感统训练游戏活动', '通过感统游戏帮助孩子提升身体协调能力和专注力。', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Children%20playing%20sensory%20games%20with%20colorful%20equipment%2C%20parents%20guiding%20and%20encouraging&image_size=square', '感统训练', '3-8岁', '深圳市南山区儿童发展中心', 128.00, 158.00, 20, '2024-01-22 15:30:00+08', '2024-01-22 17:00:00+08', '2024-01-21 15:00:00+08', '儿童发展专家团队', '0755-23456789', 4.7, 28, true);