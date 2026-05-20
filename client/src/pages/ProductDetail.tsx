import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../api/products'
import { addItem } from '../api/cart'
import { CART_USER, useCart } from '../contexts/CartContext'
import type { Product } from '../types'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { refresh } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    getProductById(Number(id))
      .then(setProduct)
      .catch(() => setNotFound(true))
  }, [id])

  async function handleAddToCart() {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      await addItem(CART_USER, product.id)
    }
    await refresh()
    alert('Product added to cart!')
  }

  if (notFound) {
    return (
      <div className="container my-5 py-5 text-center">
        <h2>Product not found.</h2>
        <Link to="/shop" className="btn btn-outline-dark mt-3">Back to Shop</Link>
      </div>
    )
  }

  if (!product) {
    return <div className="container my-5 py-5 text-center">Loading...</div>
  }

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-6 mb-4 text-center">
          <div
            className="bg-light p-4 rounded shadow-sm d-flex align-items-center justify-content-center"
            style={{ height: 500 }}
          >
            <img
              src={`/${product.image}`}
              className="img-fluid"
              style={{ maxHeight: '100%', objectFit: 'contain' }}
              alt={product.name}
            />
          </div>
        </div>

        <div className="col-md-6 px-lg-5">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/shop" className="text-decoration-none text-muted">Shop</Link>
              </li>
              <li className="breadcrumb-item active">{product.category}</li>
            </ol>
          </nav>

          <h1 className="display-4 fw-bold mb-3">{product.name}</h1>
          <h2 className="text-success mb-4 fw-light">€ {product.price.toFixed(2)}</h2>
          <p className="lead text-muted mb-4">{product.description}</p>

          <div className="p-3 bg-light border-start border-4 border-success mb-4">
            <small className="text-uppercase fw-bold text-muted d-block">Ideal for:</small>
            <span className="fs-5">{product.skinType} Skin</span>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">Ingredients:</h5>
            <p className="text-muted small">
              {product.ingredients.length > 0
                ? product.ingredients.join(', ')
                : 'Natural botanical extracts.'}
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">How to Use:</h5>
            <p className="text-muted small">
              {product.howToUse || 'Apply uniformly to skin as needed.'}
            </p>
          </div>

          <div className="d-flex align-items-center mb-4 gap-3">
            <label htmlFor="detail-qty" className="fw-bold mb-0">Quantity:</label>
            <input
              id="detail-qty"
              type="number"
              className="form-control rounded-0 text-center"
              value={quantity}
              min={1}
              max={10}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: 80 }}
            />
          </div>

          <button
            className="btn btn-dark btn-lg w-100 py-3 rounded-0 shadow"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}
