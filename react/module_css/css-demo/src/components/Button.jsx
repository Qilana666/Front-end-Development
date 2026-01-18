// module.css 是css module的文件
// css in js jsx js 写成html 一样
// react 将css文件 编译成js对象
// 类名 作为js 对象的key
// 类名的值 作为hash的绝对唯一的名字
import styles from './Button.module.css'
import './Button.module.css'
console.log(styles)
// 以组件为单位控制样式的可控性
export default function Button() {
  return (<>
    <h1 className={styles.txt}>你好，世界！！！</h1>
    <button className={styles.button}>My Button</button>
  </>     
  )
} 