import {
  Injectable
} from '@nestjs/common';
import type { Message } from './dto/chat.dto';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import * as fs from 'fs/promises'; //promisify 
import path from 'path';
// 向量数据库，ai应用 功能的一个核心之一
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

interface Post {
  title: string;
  category: string;
  embedding: number[];
}

// 本地模拟嵌入生成器
class MockEmbeddings {
  embedQuery = async (text: string): Promise<number[]> => {
    // 生成随机 1536 维向量
    return Array.from({ length: 1536 }, () => {
      return (Math.random() * 2 - 1).toFixed(6);
    }).map(Number);
  };

  embedDocuments = async (documents: string[]): Promise<number[][]> => {
    return Promise.all(documents.map(doc => this.embedQuery(doc)));
  };
}

// 本地模拟聊天模型
class MockChatModel {
  invoke = async (prompt: string | any): Promise<{ content: string }> => {
    // 简单的规则匹配回答
    const promptText = typeof prompt === 'string' ? prompt : prompt.toString();
    
    if (promptText.includes('RAG')) {
      return {
        content: 'RAG (Retrieval-Augmented Generation) 是一种通过检索外部知识来增强大语言模型回答能力的技术。它结合了信息检索和生成模型的优势，能够为模型提供最新、准确的知识，从而生成更加可靠的回答。'
      };
    } else if (promptText.includes('React')) {
      return {
        content: 'React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并维护。它允许开发者创建可复用的 UI 组件，通过声明式语法和虚拟 DOM 提高开发效率和应用性能。'
      };
    } else if (promptText.includes('NestJS')) {
      return {
        content: 'NestJS 是一个用于构建服务器端应用的 Node.js 框架，它基于 TypeScript 开发，提供了模块化的架构和丰富的功能，特别适合构建企业级应用。'
      };
    } else {
      return {
        content: '这是一个模拟的回答。在实际应用中，这里会调用真实的大语言模型来生成回答。'
      };
    }
  };

  stream = async (messages: any[]): Promise<AsyncGenerator<{ content: string }>> => {
    const content = '这是一个模拟的流式回答。';
    const chunks = content.split('');
    
    // @ts-ignore
    return {
      [Symbol.asyncIterator]: async function* () {
        for (const chunk of chunks) {
          await new Promise(resolve => setTimeout(resolve, 50));
          yield { content: chunk };
        }
      }
    };
  };
}

// 本地模拟图像生成器
class MockImageGenerator {
  invoke = async (prompt: string): Promise<string> => {
    // 返回一个占位图像 URL
    return `https://neeko-copilot.bytedance.net/api/text2image?prompt=${encodeURIComponent(prompt)}&size=512x512`;
  };
}

export function convertToLangChainMessages(messages: Message[])
: (HumanMessage | AIMessage | SystemMessage)[]{
  return messages.map(msg => {
    switch(msg.role) {
      case 'user': 
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

export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
}

@Injectable()
export class AIService {
  private posts: Post[] = [];
  private embeddings: MockEmbeddings;
  private chatModel: MockChatModel;
  private imageGenerator: MockImageGenerator;
  constructor() {
    console.log('!!!!!!!!!!!!!!~~~~~~');
    this.chatModel = new MockChatModel();
    this.embeddings = new MockEmbeddings();
    this.imageGenerator = new MockImageGenerator();
    this.loadPosts();
  }
  // 封装类的实现细节，复杂性
  private async loadPosts() {
    try{
      console.log(__dirname, "//////?????")
      // nestjs compile ts -> js  dist  
      // nest-cli assets data/**/*/  dist/
      const filePath = path.join(__dirname, "../../", 'data',"posts-embedding.json");
      const data = await fs.readFile(filePath, 'utf-8');
      // console.log(data, "?????");
      this.posts = JSON.parse(data);
    } catch(err) {
      console.error('Failed to load posts', err);
      this.posts = [];
    }
  }

  async chat(messages: Message[], onToken: (token: string) => void) {
    const stream = await this.chatModel.stream(messages);
    console.log(stream, "//////");
    for await ( const chunk of stream) {
      const content = chunk.content as string; // 断言
      // console.log(content, "//////");
      // 用模块化， 回调传递
      if (content) {
        onToken(content);
      }
    }
  }

  async search(keyword: string, topK=3) {
    const vector = await this.embeddings.embedQuery(keyword);
    // console.log(vector, '/////')
    const results = this.posts.map(post => ({
      ...post,
      similarity: cosineSimilarity(vector, post.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(item => item.title);

    return {
      code: 0,  // 没有任何错误
      data: results
    }
  }
  
  async avatar(name: string) {
    const imgUrl = await this.imageGenerator.invoke(`
    你是一位头像设计师，
    根据用户的姓名${name},
    设计一个专业的头像。
    风格卡通，时尚，好看。  
    `)
    console.log(imgUrl);
    return imgUrl;
  }

  async rag(question: string) {
    // 内存向量数据库
    const vectorStore = await MemoryVectorStore.fromDocuments(
      [
        new Document({
          pageContent: "React是一个用于构建用户界面的JavaScript库"
        }),
        new Document({
          pageContent: "NestJS 是一个用于构建服务器应用的node.js框架，擅长企业级开发"
        }),
        new Document({
          pageContent: "RAG 通过检索外部知识增强大模型的回答能力"
        }),
      ],
      this.embeddings
    )
    // 相似度搜索
    const docs = await vectorStore.similaritySearch(question, 1);
    console.log(docs);
    // 检索上下文
    const context = docs.map(d => d.pageContent).join('\n');
    // 生成回答
    const res = await this.chatModel.invoke(`
      你是一个专业的JS工程师，请基于下面资料回答问题。
      资料：
      ${context}

      问题:
      ${question}
    `);
    console.log(res);
    return res.content;
  }
  
  async git(diff: string) {
    // 简单的模拟回答
    return {
      result: 'feat(git): 添加 git 提交信息生成功能'
    };
  }
}