import PropTypes from 'prop-types';    //提供prop类型约定，校验

// 给谁打招呼？
function Greeting(props) {
  // console.log(props)  //是个对象
  const {
    name,
    message,
    showIcon
  } = props  // 解构赋值???
  console.log(name,message,props)
  return (
    <div>
      {showIcon && <span>👋</span>}
      <h1>Hello,{name}!</h1>
      <p>{message}</p>
    </div>
  )
}

//约定
Greeting.propTypes={
  name:PropTypes.string.isRequired,
  message: {
    type:PropTypes.string, // 可以不传递
    defaultValue:'欢迎加入字节！！！'
  } ,
  showIcon: PropTypes.bool, // 可以不传递
}

export default Greeting