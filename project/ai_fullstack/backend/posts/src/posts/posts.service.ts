import {
  Injectable
} from '@nestjs/common'
import { PostQueryDto } from './dto/post-query.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query) {
    const total = await this.prisma.post.count();
    console.log(total, "---------")
    return {
      items: []
    }
  }
}