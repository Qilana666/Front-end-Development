// input handleChange handleSubmit 
// messages  
// mockjs /api/chat 流式输出 端口切到5173，纯前端 用mock试试
// chat 业务 
import {
  useChat
} from '@ai-sdk/react';

export const useChatbot = () => {
  console.log('useChatbot initialized');
  
  const chat = useChat({
    api: '/api/ai/chat',
    onError: (err) => {
      console.error("Chat Error:", err);
    },
    onResponse: (response) => {
      console.log('Chat Response:', response);
    },
    onFinish: (result) => {
      console.log('Chat Finish:', result);
    }
  });
  
  console.log('Chat instance:', chat);
  
  return chat;
}
