import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/product/new">Product New</Link>
          </li>
          <li>
            <Link to="/product/123">Product 123</Link>
          </li>
        </ul>
    </nav>
    </>
  )
}

export default Navigation
