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
  const [user, setUser] = useState<RegisteredUser | null>(getStoredUser)

  function register(u: RegisteredUser) {
    storeUser(u)
    setUser(u)
  }

  function logout() {
    removeUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
