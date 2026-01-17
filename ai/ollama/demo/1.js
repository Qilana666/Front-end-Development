// ollama 11434 端口 开源大模型API 服务
// v1/chat/completions 兼容openai 接口
const OLLAMA_URL = 'http://localhost:11434/v1/chat/completions'

const headers = {
  'Authorization': 'Bearer ollama',
  'Content-Type': 'application/json',
}

const data = {
  model:'qwen2.5:0.5b',
  messages:[
    {
      role:'user',
      content:'你好,你是'
    }
  ]
}
fetch(OLLAMA_URL, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
  .then(res => {
    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers));
    return res.text();
  })
  .then(text => {
    console.log('Response text:', text);
    try {
      const data = JSON.parse(text);
      console.log('Parsed JSON:', data);
      if (data.choices && data.choices[0] && data.choices[0].message) {
        console.log('Message:', data.choices[0].message);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  })
  .catch(err => console.error('Error:', err));