import 'dotenv/config'
import {
  ChatDeepSeek
} from '@langchain/deepseek';
import {
  PromptTemplate
} from '@langchain/core/prompts';
//LLM 黑盒打开 key prompt 
//langchain 是ai 应用的工程化
import {
  RunnableSequence
} from '@langchain/core/runnables';  //AI应用的编程方式

const model = new ChatDeepSeek({
  model:'deepseek-reasoner',
  temperature: 0.7, 
})

const explainPrompt = PromptTemplate.fromTemplate(`
  你是一个前端专家，请详细介绍以下概念：{topic}
  要求：覆盖定义、原理、使用方式,不超过300字。  
  `)

  const summaryPrompt=PromptTemplate.fromTemplate(`
    请将以下前端概念解释总结为3个核心要点(每点不超过20个字)
    {explanation}
  `)

const explainChain = explainPrompt.pipe(model)
console.log(explainChain)
const summaryChain = summaryPrompt.pipe(model)
const fullChain = RunnableSequence.from([
  (input) => explainChain.invoke({ topic: input.topic }).then(res => res.text),
  (explanation)=>summaryChain.invoke({explanation}).then(res=>`知识点：${explanation} 总结：${res.text}`)
])

const response=await fullChain.invoke({
  topic:'闭包'
})

console.log(response)