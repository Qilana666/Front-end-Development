import React, {
  useEffect,
  useState
} from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import {throttle} from '@/utils'

// 接口的声明，首字母大写
interface BackToTopProps{
  // 滚动超过多少像素后显示按钮
  threshold?: number
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 400,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  // 滚动到顶部
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    }
    //节流函数
    const thtottle_func = throttle(toggleVisibility, 200); //0.2s内执行一次
    // window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', thtottle_func);
    //组件卸载时移除事件监听,避免内存泄漏
    return () => window.removeEventListener('scroll', thtottle_func);  
  }, [threshold])

  if(!isVisible) {
    return null;
  }
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollTop}
      className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl z-50
      ">

      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
export default BackToTop
