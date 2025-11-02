const OpenAI = require('openai');
require('dotenv').config();

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.agicto.cn/v1",
});

async function testConnection() {
  try {
    console.log('Testing OpenAI API connection...');
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    
    // 简单测试，发送一个很小的请求
    const response = await openai.models.list();
    console.log('API Connection successful!');
    console.log('Available models:', response.data.length);
  } catch (error) {
    console.error('API Connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();