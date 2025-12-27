// ❓所以问题来了：为什么这么麻烦？
// 因为 React 默认是“封闭”的 —— 每个组件只能看到自己的 props，看不到别人的。

// UserInfo 不可能直接访问 App 里的 user
// 所以必须靠中间人一层层传（这就是 **props drilling**）
function Page({ user }) {  
  //✅ ↑ 这里的 { user } 是从 props 里“解构”出来的
  // 相当于 const user = props.user;

  return (
    <Header user={user} />  // ← 又把 user 传给 Header
  );
}

function Header({ user }) {
  return (
    <UserInfo user={user} />
  )
}
//props可以是什么东西？  数据  函数(事件)  组件
// children 就是你写在标签中间的内容，最常用、最自然。

function UserInfo({ user }) {
  return (
    <div>
      {user.name}   // ✅🫣终于用上了！
    </div>
  )
}


// ✅ 先记住一个核心原则：
// 在 React 中，父组件想让子组件知道某个数据，就必须通过 props 显式传过去。
export default function App() {
  const user = { name: 'Andrew' };  //父组件持有数据    登录
  return (
    <Page user={user} >
      121212
    </Page>
    // ✅ 这里 Page 收到的 props 是：{ user: { name: 'Andrew' }, children: "121212" }
  )
}