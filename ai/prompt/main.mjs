import OpenAI from 'openai';
import { config } from 'dotenv';

config({
    path: '.env'
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:'https://api.agicto.cn/v1'
});


const saleData = `销售数据:
日期,产品,销量,单价,总收入
2023-01-01,iPhone 13,100,6000,600000
2023-01-01,iPhone 14,50,8000,400000
2023-01-02,iPhone 13,80,6000,480000
2023-01-02,iPhone 14,60,8000,480000
2023-01-03,iPhone 13,120,5800,696000
2023-01-03,iPhone 14,80,7800,624000
`

const main = async (reference_data, query) => {
  // 制定一个身份， 找对人
  // 模板字符串
  // 多行
  // 准确的描述任务， 
  //数据， 清楚说明+格式限定
  // \n \n\n 边界效果
  const prompt = `
  You are an AI data analysis  assistant that generates sales 
  reports based on the given sales data.
  Here is the sales data:\n ${reference_data} \n\n
  Please generate a report to answer the following question:\n
  ${query}
  `
  let response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 1024,
    // 创意性 
    temperature: 0.1,
  })

  console.log(response.choices[0].message.content)
}

main(
  saleData,
  '根据上述销售数据，计算iphone13和iphone14的总销售额各是多少？'
);