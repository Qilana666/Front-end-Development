import Greeting from './components/Greeting'
import Modal from './components/Modal'
import Card from './components/Card'

const MyHeader = () => {
  return (
    <h2 style={{ margin: 0 ,color:'pink'}}>自定义标题</h2>
  )
}
const MyFooter=()=>{
  return (
    <div style={{ textAlign: 'right' }}>
      <button onClick={() => alert('关闭')}
      style={{padding:'0.5rem 1rem'}}
      >
        
        关闭
      </button>
    </div>   //两个花括号是因为要在jsx中嵌入js表达式 占位符
  )
}
function App() {
  return (
    <div>
      111
      {/* 自定义组件  props 属性*/}
      {/* <Greeting name="张三" message="欢迎加入字节！！！"/> */}
      {/* <Greeting name="张三" message="欢迎加入阿里" showIcon />
      <Greeting name="李四" /> */}

      {/* 自定义弹窗组件 */}
      {/* <Modal
        HeaderComponent={MyHeader}
        FooterComponent={MyFooter}
      >
        <p>这是一个弹窗</p>
        <p>你可以在这里显示任何JSX</p>
      </Modal> */}

      {/* 自定义卡片组件 */}
      {/* jsx本质是个js  class是js的关键字，不能用class="user-card" */}
      <Card className="user-card">
        <h2>张三</h2>
        <p>高级前端工程师</p>
        <button>查看详情</button>
      </Card>
    </div>
  )
}
export default App