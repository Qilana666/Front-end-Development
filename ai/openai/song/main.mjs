// console.log('hello world!');
import OpenAI from 'openai';
import dotenv from 'dotenv';
// 加载环境变量
dotenv.config();//.env文件中的配置添加到环境变量
// llm client 实例化
const client = new OpenAI(
  {
    apiKey: process.env.OPENAI_API_KEY,
    // baseURL:'https://api.openai.com/v1'
    baseURL: 'https://api.302.ai/v1'
  }
  // 算力，电力， 凭据
);
// 异步的操作
// AIGC 
const response = await client.completions.create({
  // openai 模型家族
  // 文本模型
  // 价格平民
  model: 'gpt-3.5-turbo-instruct',
  max_tokens: 256,
  // 提示词是和LLM 交流的方式
  // es6 字符串模版 ``多行文本 详细且清晰的LLM需要完成的任务    "" ''
  prompt: `
  假如你是林夕这样的爱情歌曲作词大家，
  请你写一首100字，为汪峰，写一首他爱上森林北的歌曲。
  森林北是一位美丽，勇敢，会骑马的女孩儿
  `
})
//llm 一次性给我们多条返回让我们选择
const result = response.choices[0].text;
console.log('歌词是' + result);
