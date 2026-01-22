import { create } from 'zustand';
import type {SlideData} from '@/components/SlideShow';
import type { Post } from '@/types';
import { fetchPosts } from '@/api/posts';

interface HomeState {
  banners: SlideData[];
  posts: Post[];
  loadMore: () => Promise<void>
}

export const useHomeStore = create<HomeState>((set) => ({
  banners:[{
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
  }],
  posts:[],
  loadMore: async () => {
    // const { items } = await fetchPosts();
    console.log(await fetchPosts());
  }
}))