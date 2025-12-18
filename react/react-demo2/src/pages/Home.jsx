import {
  //共同点，都以use开头 函数  hooks函数
  useState, //响应式状态管理
  useEffect // 副作用管理  onMounted 挂载后
} from 'react';

const Home = () => {
  const [repos,setRepos] = useState([]); 
  // console.log('组件初始化');
  useEffect(() => {
    // home组件可以看到了
    // console.log('组件挂载后');
    //发送api请求 不会和组件渲染去争抢
    fetch('https://api.github.com/users/Qilana666/repos')
      .then(res => res.json())
      .then(data => { 
        // console.log(data);
        setRepos(data); // 状态更新 触发组件重新渲染
      })
  },[])
  return (
    <div>
      <h1>Home</h1>
      {
        repos.length ? (
          <ul>
            {
              // 遍历数组 渲染列表项 循环输出
              repos.map(repo => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))
            }
          </ul>
        ): (
            <p>暂无仓库</p>
        )
      }
    </div>
  )
}

export default Home