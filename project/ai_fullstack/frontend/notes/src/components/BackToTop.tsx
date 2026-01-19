import React, {
  useEffect,
  useState
} from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

// 接口的声明，首字母大写
interface BackToTopProps{
  // 滚动超过多少像素后显示按钮
  threshold?: number
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 400,
}) => {
const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    }
    window.addEventListener('scroll', toggleVisibility);
  }, [threshold])

  if(!isVisible) {
    return null;
  }
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={()=>{}}
      className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl z-50
      ">

      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}
export default BackToTop
