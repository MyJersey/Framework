export default function About() {
  return (
    <>
      <header className="py-5 bg-light text-center">
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">Our Story</h1>
          <p className="lead text-muted max-w-lg mx-auto">
            Discover the philosophy behind Natural Skincare and our commitment to clean, conscious beauty.
          </p>
        </div>
      </header>

      <section className="py-5 my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src="/img/About_Us_Story.jpg"
                alt="Natural Skincare Philosophy"
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-lg-6 px-lg-5">
              <h2 className="display-5 fw-bold mb-4">Beauty Inspired by Nature</h2>
              <p className="lead text-muted mb-4">
                Founded in 2026, Natural Skincare was born from a simple belief: the earth provides
                everything we need to nourish and care for our skin.
              </p>
              <p className="text-muted mb-4">
                We spent years working with botanists and dermatologists to create formulas that are
                both gentle on the planet and remarkably effective. Every product in our collection is
                crafted with intention, using only the highest quality, sustainably sourced ingredients.
              </p>
              <p className="text-muted mb-4">
                Our commitment to transparency means what you see on our labels is exactly what you
                get—no hidden synthetics, no unnecessary fillers, just pure botanical power.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <h2 className="text-center display-5 fw-bold mb-5">Our Core Values</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="bg-white p-5 rounded h-100 shadow-sm">
                <i className="bi bi-flower1 display-4 text-success mb-4 text-center d-block" />
                <h4 className="fw-bold mb-3">100% Natural</h4>
                <p className="text-muted">
                  We strictly avoid parabens, sulfates, synthetic fragrances, and artificial dyes.
                  Our ingredients are derived straight from nature.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white p-5 rounded h-100 shadow-sm">
                <i className="bi bi-globe-americas display-4 text-success mb-4 text-center d-block" />
                <h4 className="fw-bold mb-3">Sustainable</h4>
                <p className="text-muted">
                  From our ethically sourced botanicals to our fully recyclable glass and paper
                  packaging, we minimize our ecological footprint.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white p-5 rounded h-100 shadow-sm">
                <i className="bi bi-heart display-4 text-success mb-4 text-center d-block" />
                <h4 className="fw-bold mb-3">Cruelty-Free</h4>
                <p className="text-muted">
                  We love animals as much as we love the planet. We never test on animals and our
                  entire line is proudly certified vegan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
