import { createContext, useContext, useState } from 'react'
import type { RegisteredUser } from '../types'
import { getStoredUser, storeUser, removeUser } from '../utils/storage'

interface AuthContextValue {
  user: RegisteredUser | null
  register: (user: RegisteredUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Passing getStoredUser (without calling it) is "lazy initialisation":
  // React calls the function once on mount to set the initial state.
  // This means if the user registered in a previous session, they're
  // immediately recognised when the page loads.
  const [user, setUser] = useState<RegisteredUser | null>(getStoredUser)

  function register(u: RegisteredUser) {
    storeUser(u)
    setUser(u)
  }

  function logout() {
    removeUser()
    setUser(null)
    // note: the cart is intentionally NOT cleared on logout
  }

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook so components don't need to import AuthContext directly.
// The error ensures this is never called outside of AuthProvider.
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
