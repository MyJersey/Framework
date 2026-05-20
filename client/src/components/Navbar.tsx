import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop', end: false },
  { to: '/contact', label: 'Contact', end: false },
  { to: '/about', label: 'About Us', end: false },
]

export default function AppNavbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const [expanded, setExpanded] = useState(false)

  function handleLogout() {
    if (window.confirm('Log out?')) logout()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 sticky-top shadow-sm">
      <div className="container-fluid px-lg-5">
        <Link className="navbar-brand fs-3 m-0" to="/">Natural Skincare</Link>

        <div
          className={`collapse navbar-collapse justify-content-center order-lg-2${expanded ? ' show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to} className="nav-item">
                <NavLink
                  end={end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  to={to}
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3 order-lg-3 ms-auto ms-lg-0">
          {user ? (
            <button
              className="btn btn-link text-dark p-0 text-decoration-none"
              onClick={handleLogout}
            >
              Hi, {user.firstName}
            </button>
          ) : (
            <Link to="/register" className="text-dark">
              <i className="bi bi-person fs-4" />
            </Link>
          )}

          <Link to="/cart" className="text-dark position-relative me-2">
            <i className="bi bi-bag fs-5" />
            {itemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={expanded}
            onClick={() => setExpanded(e => !e)}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </div>
    </nav>
  )
}
