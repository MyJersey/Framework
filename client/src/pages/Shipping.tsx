export default function Shipping() {
  return (
    <>
      <header className="py-5 bg-light text-center">
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">Shipping Rates &amp; Policies</h1>
          <p className="lead text-muted max-w-lg mx-auto">
            Everything you need to know about getting your Natural Skincare products delivered.
          </p>
        </div>
      </header>

      <div className="container my-5 py-5 mx-auto" style={{ maxWidth: 800 }}>
        <h3 className="fw-bold mb-4">Domestic Shipping Options</h3>
        <p className="text-muted mb-4">
          We ship all domestic orders via eco-friendly carriers to ensure the lowest carbon footprint
          possible. You will receive a tracking number as soon as your order leaves our warehouse.
        </p>

        <table className="table table-bordered mb-5">
          <thead className="bg-light">
            <tr>
              <th scope="col">Shipping Method</th>
              <th scope="col">Estimated Time</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard Eco Delivery</td>
              <td>3-5 Business Days</td>
              <td>€ 4.90 (Free over € 50)</td>
            </tr>
            <tr>
              <td>Express Delivery</td>
              <td>1-2 Business Days</td>
              <td>€ 9.90</td>
            </tr>
          </tbody>
        </table>

        <h3 className="fw-bold mb-4">International Shipping</h3>
        <p className="text-muted mb-4">
          We are thrilled to send our skincare across Europe and select international destinations.
          Delivery times and customs duties may vary based on your location.
        </p>

        <ul className="list-group list-group-flush mb-5">
          <li className="list-group-item px-0 py-3 d-flex justify-content-between">
            <span className="text-muted">European Union (Standard)</span>
            <strong>5-7 Business Days (from € 9.00)</strong>
          </li>
          <li className="list-group-item px-0 py-3 d-flex justify-content-between">
            <span className="text-muted">United Kingdom</span>
            <strong>5-8 Business Days (from € 12.00)</strong>
          </li>
          <li className="list-group-item px-0 py-3 d-flex justify-content-between">
            <span className="text-muted">United States &amp; Canada</span>
            <strong>7-14 Business Days (from € 25.00)</strong>
          </li>
          <li className="list-group-item px-0 py-3 d-flex justify-content-between">
            <span className="text-muted">Mainland China</span>
            <strong>10-15 Business Days (from € 30.00)</strong>
          </li>
        </ul>

        <div className="p-4 bg-light border-start border-4 border-success mt-4">
          <h5 className="fw-bold">
            <i className="bi bi-box-seam text-success me-2" /> Our Packaging Commitment
          </h5>
          <p className="text-muted mb-0 mt-2">
            All our shipping materials are composed of 100% recycled fibers and are fully
            biodegradable. We say no to plastic bubble wrap and synthetic filling.
          </p>
        </div>
      </div>
    </>
  )
}
