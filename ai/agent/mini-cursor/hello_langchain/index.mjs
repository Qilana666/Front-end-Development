import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';  //提升安全性
dotenv.config();

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL
    }
});

const response = await model.invoke("介绍下高德地图");
console.log(response.content);