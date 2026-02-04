import {
  Injectable,
  BadRequestException // 错误处理
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }
  // 数据库操作（Prisma）和密码加密（bcrypt）都是“耗时”的异步操作，不能阻塞主线程。
  async register(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    console.log(name, "--------");
    const existingUser = await this.prisma.user.findUnique({
      where: {
        name
      }
    })
    if (existingUser) {
      // 抛出异常 
      // nest 企业级 捕获并返回给用户错误信息
      // 弱类型， 单线程， 出错可能灾难性

      throw new BadRequestException("用户名已存在")
    }
    // 10 加密算法的强度  数字越大越安全，但用户登录时等待的时间也越长。目前主流推荐使用 12。
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword, hashedPassword.length);
    // console.log(await bcrypt.hash("123456", 10));
    // console.log(await bcrypt.compare())
    // 将新用户的信息写入数据库，并且只返回你需要的字段（ID 和 name），隐藏敏感信息（如 password）
    const user = await this.prisma.user.create({
    // 当前服务（this）已经通过依赖注入拿到了数据库连接工具（prisma），现在我想要操作数据库里的用户表（user），并对它执行后续的动作（.create / .findUnique 等）
    // this.prisma.user：这是通过依赖注入进来的 Prisma Client。user 对应的是数据库中的用户表。
    // .create({...})：这是 Prisma 提供的方法，用于向数据库表中插入一条新数据。
    // await：因为操作数据库需要时间（网络请求/磁盘读写），所以必须用 await 等待它执行完毕。等数据库把数据存好并返回结果后，代码才会继续往下执行。
      data: {
        name,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true
      }
    })

    return user
  }
}