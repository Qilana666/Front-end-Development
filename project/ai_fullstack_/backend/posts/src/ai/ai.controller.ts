import {
  Controller,
  Post,
  Body,
  Res
} from '@nestjs/common';
import { AIService } from './ai.service'
import { ChatDto } from './dto/chat.dto';

@Controller('ai')
export class AIController{
  constructor(private readonly aiService: AIService){}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @Res() res) {
    // console.log(chatDto)
    // return {
    //   chatDto
    // }
    // 流式输出
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache'); // 每次llm 重新生成
    res.setHeader('Connection', 'keep-alive'); // 保持连接

    try { 
      await this.aiService.chat(chatDto.messages, (token: string) => {
        res.write(`0:${JSON.stringify(token)}\n`);
      })
      res.end();
    } catch(err) {
      console.error(err);
      res.status(500).end();
    }
  }
}
