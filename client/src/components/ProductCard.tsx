import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { addItem } from '../api/cart'
import { useCart, CART_USER } from '../contexts/CartContext'
/*
    useState: Manages the local loading state for the Add to Cart operation.
    Link: Enables navigation to the product detail page.
    Product: TypeScript type for a product (enforces prop type).
    addItem: API call to add an item to the cart.
    useCart, CART_USER: Access to cart context and identifier for the cart.
*/

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { refresh } = useCart() //refresh cart items
  const [addingToCart, setAddingToCart] = useState(false)

  async function handleAddToCart(e: React.MouseEvent) {
    // Stop the click from reaching the <Link> so the page doesn't navigate.
    e.stopPropagation() // Prevent navigating to the product page
    e.preventDefault()
    if (addingToCart) return // Prevent multiple clicks while adding
    setAddingToCart(true)
    await addItem(CART_USER, product.id) // Perform the add to cart action
    await refresh() // Refresh cart state to reflect the new item
    setAddingToCart(false)
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
              disabled={addingToCart}
              title="Add to cart"
            >
              {addingToCart ? '…' : '+'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
