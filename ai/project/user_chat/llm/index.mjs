// http 服务 和llm 服务结合起来
import http from 'http';
import OpenAI from 'openai';
import url from 'url';
import {
  config //config 是 dotenv 模块的一个函数，用于加载 .env 文件中的环境变量。
} from 'dotenv'; //dotenv 是什么？dotenv 是一个 Node.js 模块，用于加载 .env 文件中的环境变量。
config({
  path: '.env' //
});
console.log(process.env.OPENAI_API_KEY, '////'); // 打印 aigc 服务的 apiKey
// 为什么要打印 apiKey？因为 aigc 服务需要 apiKey 来验证请求是否合法。
// 为什么报错？因为 aigc 服务的 apiKey 是从 .env 文件中加载的，而 .env 文件中没有定义 OPENAI_API_KEY 这个环境变量。

const client = new OpenAI({ //client 是 OpenAI 类的一个实例，用于调用 aigc 服务。
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.302.ai/v1/chat/completions'
  // baseURL: 'https://api.302.ai/v1'
})

// aigc
const getCompletion = async (prompt, model = 'gpt-3.5-turbo') => { // 调用 aigc 服务
  //为什么用async？因为调用 aigc 服务是一个异步操作，需要等待服务返回结果。
  //getCompletion 函数的作用是调用 aigc 服务，获取模型的回答。
  const messages = [{ //
    role: 'user',
    content: prompt
  }]
  const result = await client.chat.completions.create({ // 调用 aigc 服务
    model,
    messages,
    temperature: 0.1 // 自由度 范围是[0, 1]，值越大，回答越随机
  })
  return result.choices[0].message.content;
}

// const result = await getCompletion('你好');
// console.log(result);
http.createServer(async (req, res) => { // 创建 http 服务
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问 解决跨域问题
  const parsedUrl = url.parse(req.url, true);
  const prompt = `
  ${parsedUrl.query.data}
  请根据上面的JSON数据， 回答${parsedUrl.query.question} 这个问题。
  `
  try {
    const result = await getCompletion(prompt);
    const info = { result };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(info));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: String(err) }));
  }
}).listen(443) // 监听 1314 端口
// 为什么要监听 443 端口？因为 302.ai 服务的端口是 443。
//我怎么知道 302.ai 服务的端口是 443？因为 302.ai 服务的文档中指定了端口为 443。
