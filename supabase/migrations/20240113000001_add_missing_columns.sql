-- 添加缺失的列以匹配应用程序期望

-- 为activities表添加is_published列
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

-- 为books表添加is_active列
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 为activities表添加city和district列（用于位置筛选）
ALTER TABLE public.activities 
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS district VARCHAR(100);

-- 更新现有数据的默认值
UPDATE public.activities SET is_published = TRUE WHERE is_published IS NULL;
UPDATE public.books SET is_active = TRUE WHERE is_active IS NULL;

-- 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_activities_is_published ON public.activities(is_published);
CREATE INDEX IF NOT EXISTS idx_activities_city ON public.activities(city);
CREATE INDEX IF NOT EXISTS idx_activities_district ON public.activities(district);
CREATE INDEX IF NOT EXISTS idx_books_is_active ON public.books(is_active);