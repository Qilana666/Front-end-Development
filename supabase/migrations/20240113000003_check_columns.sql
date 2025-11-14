-- 检查数据库中实际的列结构
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('books', 'activities')
AND column_name IN ('is_active', 'is_published', 'is_featured')
ORDER BY table_name, column_name;