import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getCart } from '../api/cart'

// All cart API calls use this fixed user key. There is no per-user cart —
// the spec only requires a single shared cart, so 'guest' is always used.
export const CART_USER = 'guest'

interface CartContextValue {
  itemCount: number
  refresh: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0)

  // useCallback gives refresh a stable reference across renders.
  // Without it, a new function would be created on every render,
  // which would cause the useEffect below to re-run on every render (infinite loop).
  const refresh = useCallback(async () => {
    try {
      const items = await getCart(CART_USER)
      setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
    } catch {
      setItemCount(0)
    }
  }, [])

  // Load the initial cart count when the app first mounts.
  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <CartContext.Provider value={{ itemCount, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
