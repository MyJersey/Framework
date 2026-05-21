import { Link } from 'react-router-dom'

export default function Returns() {
  return (
    <>
      <header className="py-5 bg-light text-center">
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">Returns &amp; Refunds</h1>
          <p className="lead text-muted max-w-lg mx-auto">
            We want you to love your skincare routine. If you're not satisfied, we're here to help.
          </p>
        </div>
      </header>

      <div className="container my-5 py-5 mx-auto" style={{ maxWidth: 800 }}>
        <h3 className="fw-bold mb-4">Our 30-Day Guarantee</h3>
        <p className="text-muted mb-5">
          We stand behind the quality of our botanical formulas. If you try a product and it isn't the
          perfect fit for your skin, you can return it within 30 days of purchase for a full refund or
          exchange, even if it's been gently used.
        </p>

        <div className="row g-4 mb-5">
          <div className="col-md-4 text-center">
            <div className="bg-light p-4 rounded h-100 border">
              <i className="bi bi-1-circle display-5 text-success mb-3 d-block" />
              <h5 className="fw-bold">Contact Us</h5>
              <p className="small text-muted mb-0">
                Submit a return request via our{' '}
                <Link to="/contact" className="text-dark text-decoration-none border-bottom border-dark">
                  Contact Form
                </Link>{' '}
                with your order number.
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-light p-4 rounded h-100 border">
              <i className="bi bi-2-circle display-5 text-success mb-3 d-block" />
              <h5 className="fw-bold">Get Label</h5>
              <p className="small text-muted mb-0">
                We will email you a prepaid return shipping label (for domestic orders).
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-light p-4 rounded h-100 border">
              <i className="bi bi-3-circle display-5 text-success mb-3 d-block" />
              <h5 className="fw-bold">Refund</h5>
              <p className="small text-muted mb-0">
                Your refund will be processed within 5-7 days after we receive your package.
              </p>
            </div>
          </div>
        </div>

        <h4 className="fw-bold mt-5 mb-3">Exceptions &amp; Details</h4>
        <ul className="text-muted">
          <li className="mb-2">Original shipping costs are non-refundable.</li>
          <li className="mb-2">
            Products must be returned in their original packaging components (even if empty) for
            recycling purposes.
          </li>
          <li className="mb-2">Gift cards and promotional items are strictly non-refundable.</li>
          <li className="mb-2">
            For international orders, the customer is responsible for return shipping costs.
          </li>
        </ul>
      </div>
    </>
  )
}
