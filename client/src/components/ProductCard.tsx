import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { addItem } from '../api/cart'
import { useCart, CART_USER } from '../contexts/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { refresh } = useCart()
  const [adding, setAdding] = useState(false)

  async function handleAddToCart(e: React.MouseEvent) {
    // Stop the click from reaching the <Link> so the page doesn't navigate.
    e.stopPropagation()
    e.preventDefault()
    if (adding) return
    setAdding(true)
    await addItem(CART_USER, product.id)
    await refresh()
    setAdding(false)
  }

  return (
    <div className="col-md-3">
      {/* Wrapping the whole card in a Link means clicking anywhere on it navigates to the detail page */}
      <Link to={`/product/${product.id}`} className="text-decoration-none text-reset">
        <div className="product-card p-3 shadow-sm bg-white h-100">
          <div className="product-img-wrapper position-relative">
            {product.isNew && (
              <span className="badge bg-success position-absolute top-0 start-0 m-2">New</span>
            )}
            {/* The leading slash makes this an absolute path from the server root.
                Images live in client/public/img/ and Vite serves public/ at '/'. */}
            <img src={`/${product.image}`} className="img-fluid" alt={product.name} />
          </div>
          <h6 className="mb-1 fw-bold">{product.name}</h6>
          <p className="small text-muted mb-2">{product.category}</p>
          <div className="d-flex align-items-center justify-content-between mt-auto">
            <p className="mb-0 fw-bold text-success">€ {product.price.toFixed(2)}</p>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={handleAddToCart}
              disabled={adding}
              title="Add to cart"
            >
              {adding ? '…' : '+'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
