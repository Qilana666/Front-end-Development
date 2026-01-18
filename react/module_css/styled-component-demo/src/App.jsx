import {
  useState
} from 'react';
import styled from 'styled-components'; //样式组件
//样式组件
const Button = styled.button`
background:${props => props.primary ? 'blue' : 'white'};
color:${props => props.primary ? 'white' : 'blue'};
border:1px solid blue;
padding:8px 16px;
border-radius:4px;
`
console.log(Button)

function App() {
  return (
    <>
      <Button>默认按钮</Button>
      <Button primary>主要按钮</Button>
    </>
  )
}
export default App
