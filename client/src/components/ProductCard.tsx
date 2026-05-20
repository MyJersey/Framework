import { Link } from 'react-router-dom'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col-md-3">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-reset">
        <div className="product-card p-3 shadow-sm bg-white h-100">
          <div className="product-img-wrapper position-relative">
            {product.isNew && (
              <span className="badge bg-success position-absolute top-0 start-0 m-2">New</span>
            )}
            <img src={`/${product.image}`} className="img-fluid" alt={product.name} />
          </div>
          <h6 className="mb-1 fw-bold">{product.name}</h6>
          <p className="small text-muted mb-2">{product.category}</p>
          <p className="mb-0 fw-bold text-success">€ {product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  )
}
