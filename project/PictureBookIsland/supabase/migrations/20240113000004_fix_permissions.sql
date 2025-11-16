-- 检查并修复权限问题
-- 检查当前权限
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN ('books', 'activities')
AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee;

-- 如果权限不足，授予必要的权限
GRANT SELECT ON public.books TO anon;
GRANT SELECT ON public.books TO authenticated;
GRANT SELECT ON public.activities TO anon;
GRANT SELECT ON public.activities TO authenticated;