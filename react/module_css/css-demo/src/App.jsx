import Button from './components/Button'
import AnotherButton from './components/AnotherButton'

export default function App() {
  return (
    <>
      {/* 组件 是html ，css,js的集合，解决某个需求 
        组件化思想
      */}
      <Button/>
        {/*多人协作的时候，bug 冲突
          我们怎么不影响别人
          也不受别人影响  */}
      <AnotherButton />
    </>
  )
}