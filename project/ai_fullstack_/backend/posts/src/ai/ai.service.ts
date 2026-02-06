import {
  Injectable
} from '@nestjs/common';
import type { Message } from './dto/chat.dto';
import { ChatDeepSeek } from '@langchain/deepseek';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

export function convertToLangChainMessages(messages: Message[])
: (HumanMessage | AIMessage | SystemMessage)[]{
  return messages.map(msg => {
    switch(msg.role) {
      case  'user': 
        return new HumanMessage(msg.content)
      case 'assistant':
        return new AIMessage(msg.content)
      case 'system':
        return new SystemMessage(msg.content)
      default:
        throw new Error(`Unsupported role: ${msg.role}`)
    }
  })
}

@Injectable()
export class AIService {
  private chatModel: ChatDeepSeek; // llm 成为service 一个私有属性
  // constructor() {
  //   console.log(process.env.DEEPSEEK_API_KEY, process.env.DEEPSEEK_BASE_URL, "/////");
  //   this.chatModel = new ChatDeepSeek({
  //     configuration: {
  //       apiKey: process.env.DEEPSEEK_API_KEY,
  //       baseURL: process.env.DEEPSEEK_BASE_URL
  //     },
  //     model: 'deepseek-chat',
  //     temperature: 0.7,
  //     streaming: true
  //   })
  // }
  constructor() {
    console.log('!!!!!!!!!!!!!!~~~~~~');
    this.chatModel = new ChatDeepSeek({
      configuration: {
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_BASE_URL
      },
      model: 'deepseek-chat',
      temperature: 0.7,
      streaming: true
    })
    console.log(this.chatModel,'!!!!!!!!!!!!!!~~~~~~');
  }

  async chat(messages: Message[], onToken: (token: string) => void) {
    const langChainMessages = convertToLangChainMessages(messages);
    console.log(langChainMessages, this.chatModel,'/////');
    const stream = await this.chatModel.stream(langChainMessages);
    console.log(stream, "//////");
    for await ( const chunk of stream) {
      const content = chunk.content as string; // 断言
      console.log(content, "//////");
      // 用模块化， 回调传递
      if (content) {
        onToken(content);
      }
    }
  }
}