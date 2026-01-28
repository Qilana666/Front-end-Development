import {
  useParams
} from 'react-router-dom'
export default function ProductDetail() {
  const { productId } = useParams()
  console.log(productId)
  return (
    <div>
      <h2>ProductDetail</h2>
      <p>Product ID: {productId}</p>
    </div>
  ) 
}