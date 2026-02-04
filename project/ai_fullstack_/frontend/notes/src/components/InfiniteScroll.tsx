import { 
  useRef,
  useEffect
} from 'react';
// load more  通用组件 展示 props
interface InfiniteScrollProps {
  hasMore: boolean; // 是否所有数据都加载了 分页 
  isLoading?: boolean; // 滚动到底部加载更多 避免重复触发
  onLoadMore: () => void; // 更多加载的一个抽象  /api/posts?page=2&limit=10
  children: React.ReactNode // InfiniteScroll 通用的滚动功能，滚动的具体内容接受定制
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  //默认值
  hasMore,
  onLoadMore,
  isLoading = false,
  children
 }) => {
  // HTMLDivElement React 前端全局提供
  // ref 对象的 current 属性初始值为 null。
  // 在组件刚加载（挂载）时，还没有对应的 DOM 元素生成，所以它的值是 null。
  // 当组件渲染到页面上后，current 的值会被 React 自动设置为对应的 DOM 元素。
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // dom , 组件挂载之后 sentinelRef.current 
    if (!hasMore || isLoading) return  // 没有数据了， 还在加载中
    // IntersectionObserver 来自浏览器内部 没有性能问题 不需要防抖节流
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { //进入视窗  viewport
        onLoadMore();
      }
    }, {
      threshold: 0 // 只要目标元素有一个像素进入视窗，就会触发回调函数
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    // 卸载（路由切换）
    // 更新时
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current)
      }
    }
  }, [onLoadMore, hasMore, isLoading])
  // react 不建议直接访问dom， 用useRef 来获取元素的引用
  return (
    <>
      {children}
      {/* Intersection Observer 哨兵元素 */}
      <div ref={sentinelRef} className="h-4"/>
      {
        isLoading && (
        <div className="text-center py-4 text-sm text-muted-foreground">
        加载中...
        </div>
        )
      }
    </>
  )
}
export default InfiniteScroll