import type { FormEvent } from 'react'

export default function Contact() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('Message sent successfully! We will get back to you shortly.')
    e.currentTarget.reset()
  }

  return (
    <>
      <header className="py-5 bg-light text-center">
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">Get in Touch</h1>
          <p className="lead text-muted">We'd love to hear from you. Our team is always here to chat.</p>
        </div>
      </header>

      <div className="container my-5 py-5">
        <div className="row g-5">
          <div className="col-lg-6">
            <h3 className="mb-4 fw-bold">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" id="firstName" className="form-control rounded-0 p-3" required />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" id="lastName" className="form-control rounded-0 p-3" required />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" className="form-control rounded-0 p-3" required />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <select id="subject" className="form-select rounded-0 p-3">
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns &amp; Exchanges</option>
                  <option value="product">Product Advice</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" className="form-control rounded-0 p-3" rows={5} required />
              </div>
              <button type="submit" className="btn btn-dark btn-lg px-5 py-3 rounded-0">
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div className="p-5 bg-light h-100">
              <h3 className="mb-4 fw-bold">Contact Information</h3>
              <p className="mb-5 text-muted">
                Have a question about a product or your order? We're here to help.
              </p>

              <div className="d-flex mb-4 align-items-center">
                <div className="bg-white p-3 rounded-circle me-4 shadow-sm">
                  <i className="bi bi-geo-alt fs-4 text-success" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Our Store</h6>
                  <p className="mb-0 text-muted">123 Natural Avenue<br />Copenhagen, DK 1010</p>
                </div>
              </div>

              <div className="d-flex mb-4 align-items-center">
                <div className="bg-white p-3 rounded-circle me-4 shadow-sm">
                  <i className="bi bi-envelope fs-4 text-success" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email Us</h6>
                  <p className="mb-0 text-muted">hello@naturalskincare.com</p>
                </div>
              </div>

              <div className="d-flex mb-4 align-items-center">
                <div className="bg-white p-3 rounded-circle me-4 shadow-sm">
                  <i className="bi bi-telephone fs-4 text-success" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Call Us</h6>
                  <p className="mb-0 text-muted">
                    +45 12 34 56 78<br />
                    <small>Mon-Fri, 9am - 5pm CET</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
