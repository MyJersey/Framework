import { createContext, useContext, useState } from 'react'
import type { RegisteredUser } from '../types'
import { getStoredUser, storeUser, removeUser, storeCredentials, checkCredentials, isEmailRegistered } from '../utils/storage'

interface AuthContextValue {
  user: RegisteredUser | null
  register: (user: RegisteredUser, password: string) => boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<RegisteredUser | null>(getStoredUser)

  function register(u: RegisteredUser, password: string): boolean {
    if (isEmailRegistered(u.email)) return false  // already registered
    storeCredentials(u, password)
    storeUser(u)  // save session
    setUser(u)
    return true
  }

  function login(email: string, password: string): boolean {
    const found = checkCredentials(email, password)
    if (found) {
      storeUser(found)  // save session
      setUser(found)
      return true
    }
    return false
  }

  function logout() {
    removeUser()
    setUser(null)
    // note: the cart is intentionally NOT cleared on logout
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook so components don't need to import AuthContext directly
// the error ensures this is never called outside of AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
