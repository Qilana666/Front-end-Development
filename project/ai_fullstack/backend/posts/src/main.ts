import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 将nestjs 像express 一样拥有一些服务  吸星大法 
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('api'); // 全局路由前缀/api
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动过滤dot 未定义的属性
    forbidNonWhitelisted: true, // 遇到未定义的属性直接报错
    transform: true // “1” transform  1 
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
