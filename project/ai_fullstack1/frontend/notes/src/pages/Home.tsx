import {
  useEffect
} from 'react';
import Header from '@/components/Header';
import SlideShow, {type SlideData} from '@/components/SlideShow';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import { useHomeStore } from '@/store/home'
import InfiniteScroll from '@/components/InfiniteScroll';
import PostItem from '@/components/PostItem';

export default function Home() {
  const { 
    banners, 
    posts,
    hasMore,
    loadMore,
    loading
  } = useHomeStore();
  // console.log(posts, posts.length, "????????????????");
  useEffect(() => {
    loadMore();
  }, []);
  return (
    <>
      <Header title="首页" showBackBtn={true} /> 
      <div className="p-4 space-y-4">
        <SlideShow slides={banners} />
        <Card>
          <CardHeader>
            <CardTitle>欢迎来到React Mobile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">这是内容区域</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
        {
          [1,2,3,4,5,6,7,8,9,10,11,12,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((i, index) => (
            <div 
              key={index} 
              className="h-32 bg-white rounded-lg
              shadow-sm flex items-center justify-center
              border"
            >
              Item {i}
            </div>
          ))
        }
        </div>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">文章列表</h1>
          {/* 通用的滚动到底部加载更多功能 */}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={loading}
            onLoadMore={loadMore}
          >
            <ul>
            {
              posts.map(post => (
              <PostItem 
                key={post.id}
                post={post}
              />
              ))
            }
            </ul>
            {/* 业务组件 */}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}