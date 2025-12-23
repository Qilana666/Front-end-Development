// chain
// AI 业务是复杂的，分步骤处理，每一步都做到可执行，可配置，连起来，形成工作流 ，Agent
//chain 有先后顺序，有流程，可以被组织起来的
import 'dotenv/config'
import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';

const model = new ChatDeepSeek({
  model: 'deepseek-reasoner',
  temperature: 0.7, 
})

const prompt=PromptTemplate.fromTemplate(`
  你是一个前端专家，用一句话解释：{topic}
  `)

//需要先有个prompt 模版节点 ->
//model 代表llm 节点
//结束节点 invoke 执行之后
//pipe 管道  连接节点，形成工作流
//runable sequencial workflow
//SequencialChain

const chain = prompt.pipe(model) 
// console.log(chain instanceof RunnableSequence); //是一个类  可以实例化   意思是这个 chain 是不是一个由多个步骤顺序组成的流水线？
const response = await chain.invoke({
  topic: '闭包'
})
console.log(response.text)