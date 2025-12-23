import 'dotenv/config'; //导入环境变量
// console.log(process.env.DEEPSEEK_API_KEY,'///')
import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({ 
  model: 'deepseek-reasoner',
  temperature: 0.5,   //创造性 0-1  0 最稳定/严肃  1 最创造性
  //langchain 帮我们适配了市面上大多数的llm
  //baseURL langchain适配的 不需要写   适配器模式  provider 大模型提供者
  //apikey  会自动从环境变量中读取  不用写 
})

//invoke 执行
const res = await model.invoke('用一句话解释一下什么是RAG？')
console.log(res.content)
