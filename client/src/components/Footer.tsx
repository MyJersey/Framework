import { Link } from 'react-router-dom'

export default function AppFooter() {
  return (
    <footer>
      <div className="container-fluid px-lg-5">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4">
            <h4 className="text-white mb-4">Natural Skincare</h4>
            <p className="small pe-lg-5">
              Beauty that is honest, sustainable, and effective. Crafted to bring out your natural glow.
            </p>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h6 className="text-white fw-bold mb-4 text-uppercase small">Products</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shop" className="footer-link">All Products</Link></li>
              <li className="mb-2"><Link to="/shop?filter=bestsellers" className="footer-link">Bestsellers</Link></li>
              <li className="mb-2"><Link to="/shop?filter=new" className="footer-link">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mb-4">
            <h6 className="text-white fw-bold mb-4 text-uppercase small">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="footer-link">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="footer-link">Contact</Link></li>
              <li className="mb-2"><Link to="/shipping" className="footer-link">Shipping</Link></li>
              <li className="mb-2"><Link to="/returns" className="footer-link">Returns</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <h6 className="text-white fw-bold mb-4 text-uppercase small">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="footer-link fs-5"><i className="bi bi-instagram" /></a>
              <a href="#" className="footer-link fs-5"><i className="bi bi-facebook" /></a>
              <a href="#" className="footer-link fs-5"><i className="bi bi-twitter-x" /></a>
            </div>
          </div>
        </div>

        <hr className="mt-4 border-secondary" />
        <div className="text-center pt-3">
          <p className="small mb-0">&copy; 2026 Natural Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
