import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getCart } from '../api/cart'

export const CART_USER = 'guest'

interface CartContextValue {
  itemCount: number
  refresh: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0)

  const refresh = useCallback(async () => {
    try {
      const items = await getCart(CART_USER)
      setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
    } catch {
      setItemCount(0)
    }
  }, [])

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
