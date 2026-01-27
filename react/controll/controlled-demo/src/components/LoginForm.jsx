import { useState } from "react"

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    // 返回一个新的对象
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="请输入用户名" 
        name="username"
        onChange={handleChange}
        value={form.username}
      />
      <input 
        type="password" 
        placeholder="请输入密码" 
        name="password"
        onChange={handleChange}
        value={form.password}
      />
      <button type="submit">注册</button>
    </form>
  )
}