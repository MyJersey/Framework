import { Outlet } from 'react-router-dom'
import AppNavbar from './Navbar'
import AppFooter from './Footer'

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <main>
        {/* Outlet is where React Router renders the matched child route.
            When the URL is /shop, Shop.tsx renders here.
            When it's /cart, Cart.tsx renders here, and so on. */}
        <Outlet />
      </main>
      <AppFooter />
    </>
  )
}
