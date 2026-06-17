import { Outlet } from 'react-router-dom'
import AppNavbar from './Navbar'
import AppFooter from './Footer'

// Common architecture
export default function Layout() {
  return (
    <>
      <AppNavbar />
      <main>
        {/* Child Route: Outlet is the point is where React Router renders the matched child route */}
        <Outlet />
      </main>
      <AppFooter />
    </>
  )
}
