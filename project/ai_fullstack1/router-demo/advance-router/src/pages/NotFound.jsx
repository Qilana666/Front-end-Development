import {
  useEffect
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

const NotFound = () => {
  //Link 点击跳转
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
     navigate('/')
   },6000)
  }, [])
  return (
    <>
      404 Not Found
    </>
  )
}
export default NotFound