import {
  useEffect
} from 'react';
import { useHomeStore } from '@/store/home';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import SlideShow,{type SlideData} from '@/components/SlideShow';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
export default function Home() {
  const bannerData: SlideData[] = [{
      id: 1,
      title: "React 生态系统",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "移动端开发最佳实践",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_1ddcc36679304d3390dd9b8545eaa57f@5091053@ai_oswg1012730oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
    },
    {
      id: 3,
      title: "百度上线七猫漫剧，打的什么主意？",
      image: "https://img.36krcdn.com/hsossms/20260114/v2_8dc528b02ded4f73b29b7c1019f8963a@5091053@ai_oswg1137571oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp",
    }]
  const {posts, loadMore} = useHomeStore();
  useEffect(() => {
    loadMore();
  },[])
  return (
    <>
      <Header title="首页" showBackBtn={true} /> 
      <div className="p-4 space-y-4">
        <SlideShow slides={bannerData}/>
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
          [1,2,3,4,5,6,7,8,9,10,11,12,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25,26,27].map((i, index) => (
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
      </div>
      <BackToTop /> 
    </>
  )
}