export interface User{
  id: number;
  name: string;
  avatar?: string;  //可选属性
}
export interface Post{
  id: number;
  title: string;
  brief: string; //简介
  publishedAt: string; //发布时间
  totalLikes?: number; //点赞数
  totalComments?: number; //评论数
  user: User;  //作者
  tags: string[]; //标签
  thumbnail?: string; //缩略图
  pics?: string[]; //图片
}

//dry 原则 don't repeat yourself
export interface Credential{
  name: string;
  password: string;
}