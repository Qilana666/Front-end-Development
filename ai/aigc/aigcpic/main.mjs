//模块化导入
import OpenAI from 'openai';
//导入包的一部分，优化
//es6解构
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});
//进程启动了
console.log(process.env);

const client=new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //openai sdk 是AIGC事实标准
  //默认发送请求到openai 服务器
  //可以通过baseURL 自定义服务器地址 LLM 服务代理商或者其他模型
  baseURL: "https://api.agicto.cn/v1",
});
//箭头函数
//async 耗时性的任务 异步任务
const main=async()=>{
  //生成图片接口
  const response=await client.images.generate({
    model: "dall-e-3",
    prompt: "a white and cute cat",
    n: 1,
    size: "1024x1024"
  });
  console.log(response.data[0].url)
}
main();
