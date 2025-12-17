import {
  // use 开头 函数 hooks函数
  useState, //响应式状态管理
  useEffect // 副作用管理  onMounted 挂载后
}from 'react'
const Home = () => {
  const [repos, setRepos] = useState([]);
  //render 是第一位的
  console.log('组件初始化了')
  useEffect(() => {
    //home 组件可以看到了
    // console.log('组件挂载后')
    // 发送api请求，不会和组件渲染去争抢
    fetch('https://api.github.com/users/Qilana666/repos')
      .then(res => res.json())
      .then(data=>setRepos(data))
  },[])
  return (
    <div>
      <h1>Home</h1>
      
        repos.length ? (
          <ul>
            {
              repos.map(repo => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))
            }
            
          </ul>
        ):
      }
    </div>
    
  )
}
//ESM（ES Modules）和 CJS（CommonJS） JavaScript 的“模块系统”
export default Home; 