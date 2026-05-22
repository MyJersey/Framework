import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

export default function App() {
  return (
    <BrowserRouter>
      {/*
        Providers are placed outside Routes so that every page — and Layout
        itself — can read auth and cart state via useAuth() and useCart().
        The order matters: CartProvider is inside AuthProvider because in a
        future version the cart might depend on who is logged in.
      */}
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/*
              All routes share a single Layout (Navbar + Footer).
              Outlet inside Layout is where the matched child route renders.
            */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
