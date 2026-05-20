import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getCart, addItem, removeOne, removeAll } from '../api/cart'
import { getProductById } from '../api/products'
import { CART_USER, useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import type { Product } from '../types'

interface CartRow {
  product: Product
  quantity: number
}

export default function Cart() {
  const { user } = useAuth()
  const { refresh: refreshNavbar } = useCart()
  const [rows, setRows] = useState<CartRow[]>([])

  const loadCart = useCallback(async () => {
    const items = await getCart(CART_USER)
    const loaded = await Promise.all(
      items.map(async (item) => ({
        product: await getProductById(item.productId),
        quantity: item.quantity,
      }))
    )
    setRows(loaded)
  }, [])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  async function handlePlus(productId: number) {
    await addItem(CART_USER, productId)
    await loadCart()
    await refreshNavbar()
  }

  async function handleMinus(productId: number) {
    await removeOne(CART_USER, productId)
    await loadCart()
    await refreshNavbar()
  }

  async function handleRemove(productId: number) {
    await removeAll(CART_USER, productId)
    await loadCart()
    await refreshNavbar()
  }

  async function handleCheckout() {
    if (rows.length === 0) {
      alert('Your cart is empty!')
      return
    }
    alert('Thank you for your order! (Checkout simulated)')
    await Promise.all(rows.map(r => removeAll(CART_USER, r.product.id)))
    await loadCart()
    await refreshNavbar()
  }

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.quantity, 0)

  return (
    <div className="container my-5 py-5">
      <h2 className="display-5 mb-3">Your Shopping Cart</h2>
      {user
        ? <p className="lead mb-5">Hi {user.firstName}, here's what's in your cart.</p>
        : <div className="mb-5" />}

      <div className="row">
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      Your cart is empty. <Link to="/shop">Back to shop</Link>
                    </td>
                  </tr>
                ) : (
                  rows.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={`/${product.image}`}
                            alt={product.name}
                            style={{ width: 60, height: 80, objectFit: 'cover' }}
                            className="me-3"
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{product.name}</h6>
                            <small className="text-muted">{product.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>€ {product.price.toFixed(2)}</td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleMinus(product.id)}
                          >-</button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary px-3"
                            disabled
                          >{quantity}</button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handlePlus(product.id)}
                          >+</button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemove(product.id)}
                          title="Remove item"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="p-4 bg-light border">
            <h4 className="fw-bold mb-4">Summary</h4>
            <div className="d-flex justify-content-between mb-3">
              <span>Subtotal</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
              <span>Total</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-dark w-100 py-3 rounded-0"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
