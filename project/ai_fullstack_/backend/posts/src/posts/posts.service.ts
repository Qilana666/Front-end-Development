import {
  Injectable
} from '@nestjs/common'
import { PostQueryDto } from './dto/post-query.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PostQueryDto) {
    const { page, limit } = query;
    // 分页的游标
    const skip = (((page || 1) - 1) * (limit || 10));
    //性能优化：使用 Promise.all 并行查询总数和列表，减少数据库往返时间
    const [total, posts] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        skip,
        take:limit, // 拿多少个
        orderBy: { id: 'desc' },
        // 关联查询 查post的时候，顺便把user和tags，_count,files也查出来
        include: { // 关系型的数据
          user: {
            select: { // 只要哪些字段
              id: true,
              name: true,
              avatars: {
                select: { 
                  filename: true
                }
              }
            }
          },
          tags: {
            select: {
              tag: {
                select: {
                  name: true
                }
              }
            }
          },
          // _count 关键字 计数
          _count: {
            select: {
              likes: true,
              comments: true
            }
          },
          files: {
            where: {
              mimetype: { startsWith: "image/"},
            },
            select: { filename: true }
          }
        }
      })
    ])
    // 查询数据，再整备一下  
    // 数据重塑，即把数据库查询出的原始数据转换成前端需要的简洁格式
    // 截取内容摘要、拼接图片完整 URL 以及提取标签名称
    const data = posts.map(post => ({
      id: post.id,
      title: post.title,
      // content 截取
      brief: post.content?post.content.substring(0, 100):'',
      user: {
        id: post.user?.id,  //可选链
        // ?. 是 可选链操作符（Optional Chaining）。
        // 它的作用是判断属性是否存在。防范 user 关联数据为空
        // 有 ?.：如果 post.user 存在，返回 id；如果 post.user 为 null 或 undefined，表达式直接短路返回 undefined，不会报错。
        name: post.user?.name,
        avatar: `http://localhost:3000/uploads/avatar/resized/${post.user?.avatars[0]?.filename}-small.jpg`
      },
      tags: post.tags.map(t => t.tag.name),
      totalLikes: post._count.likes,
      totalComments: post._count.comments,
      // 缩略图
      thumbnail: `http://localhost:3000/uploads/resized/${post.files[0]?.filename}-thumbnail.jpg` || ""
    }))
    // const total = await this.prisma.post.count();
    // console.log(total, "---------")
    return {
      items: data,
      total: total
    }
  }
//创建文章  将接收到的数据保存到数据库
  async createPost(data: {
    title: string;
    content: string;
    userId: string;
  }) {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        userId: Number(data.userId)
      }
    })
  }
}