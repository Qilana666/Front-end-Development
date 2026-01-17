import axios from 'axios';
// 创建一个 axios 实例
const ollamaApi = axios.create({
  baseURL: 'http://localhost:11434/v1', // 设置基础地址
  headers: {
    'Authorization': 'Bearer ollama',
    'Content-Type': 'application/json',
  }
});

export const chatCompletions = async (messages) => {
  try {
    const response = await ollamaApi.post('/chat/completions', {
      model: 'qwen2.5:0.5b',
      messages,
      stream: false,
      temperature: 0.7,
    });
    return response.data.choices[0].message.content;
  } catch(err) {
    console.error('ollama 请求失败')
  }
}