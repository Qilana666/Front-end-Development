import {
  Link,
  useResolvedPath,
  useMatch
} from 'react-router-dom'

export default function Navigation() {
  const isActive = (to) => {
    const resolvedPath = useResolvedPath(to); //to 解析为Location 对象
    //当前路由比对是否匹配
    const match = useMatch({
      path: resolvedPath.pathname,
      end: true
    })
    console.log(to,match,'||||||||')
    return match ? 'active' : ''
  }

  return (
    <>
    <nav>
        <ul>
          <li>
            <Link to="/" className={isActive('/')}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about')}>About</Link>
          </li>
          <li>
            <Link to="/product" className={isActive('/product')}>Products</Link>   
          </li>
          <li>
            <Link to="/product/new" className={isActive('/product/new')}>Product New</Link>
          </li>
          <li>
            <Link to="/product/123" className={isActive('/product/123')}>Product 123</Link>
          </li>
        </ul>
    </nav>
    </>
  )
}


