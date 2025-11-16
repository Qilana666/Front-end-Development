-- 更新样本数据以匹配应用程序查询逻辑

-- 更新绘本数据：设置一些绘本为featured且active
UPDATE public.books 
SET 
    is_featured = TRUE,
    is_active = TRUE,
    is_new = CASE WHEN id IN (SELECT id FROM public.books ORDER BY created_at DESC LIMIT 3) THEN TRUE ELSE FALSE END
WHERE id IN (
    SELECT id FROM public.books 
    WHERE rating >= 4.0 
    ORDER BY rating DESC 
    LIMIT 5
);

-- 确保所有绘本都是active状态
UPDATE public.books SET is_active = TRUE WHERE is_active IS NULL;

-- 更新活动数据：设置一些活动为featured且published
UPDATE public.activities 
SET 
    is_featured = TRUE,
    is_published = TRUE,
    status = 'upcoming'
WHERE id IN (
    SELECT id FROM public.activities 
    WHERE rating >= 4.0 AND start_time > NOW()
    ORDER BY start_time ASC 
    LIMIT 3
);

-- 确保所有活动都是published状态
UPDATE public.activities SET is_published = TRUE WHERE is_published IS NULL;

-- 为活动添加一些示例城市和区域数据
UPDATE public.activities 
SET 
    city = CASE 
        WHEN id IN (SELECT id FROM public.activities ORDER BY created_at LIMIT 2) THEN '北京'
        WHEN id IN (SELECT id FROM public.activities ORDER BY created_at LIMIT 2 OFFSET 2) THEN '上海'
        ELSE '广州'
    END,
    district = CASE 
        WHEN city = '北京' THEN '朝阳区'
        WHEN city = '上海' THEN '浦东新区'
        WHEN city = '广州' THEN '天河区'
        ELSE '其他区'
    END;