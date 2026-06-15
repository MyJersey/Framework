import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getCart } from '../api/cart'

// All cart API calls use this fixed user key. There is no per-user cart
export const CART_USER = 'guest'

// local interface
interface CartContextValue {
  itemCount: number
  refresh: () => void
}

// initial value is null because the real value only exists once <CartProvider> renders
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0)

  // useCallback gives refresh a stable reference across renders, without it:
  // setItemCount changes the state and a new function would be created on every render,
  // with different identity. useEffect sees a diff refresh() and cause an infinite loop
  const refresh = useCallback(async () => {
    try {
      const items = await getCart(CART_USER)
      setItemCount(items.reduce((sum, item) => sum + item.quantity, 0)) // update badge with totale
    } catch {
      setItemCount(0)
    }
  }, [])

  // refresh on first mount and every change
  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <CartContext.Provider value={{ itemCount, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

// custom hook to consume the context
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')  // just checking, CartProvider wraps all app
  return ctx
}
