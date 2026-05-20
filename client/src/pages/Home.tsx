import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api/products'
import { useAuth } from '../contexts/AuthContext'
import type { Product } from '../types'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getAllProducts().then(setProducts).catch(() => setProducts([]))
  }, [])

  const newArrivals = products.filter(p => p.isNew).slice(0, 4)
  const bestsellers = products.filter(p => p.isBestseller && !p.isNew).slice(0, 4)
  const featured = products.filter(p => !p.isBestseller && !p.isNew).slice(0, 4)

  return (
    <>
      <header className="hero-section">
        <div className="container">
          <h1 className="display-2 fw-bold mb-3">Natural Skincare</h1>
          {user && (
            <p className="lead mb-2 fs-5">Welcome back, {user.firstName}!</p>
          )}
          <p className="lead mb-4 fs-4">Pure formulas, clinically proven results for your skin.</p>
          <Link to="/shop" className="btn btn-outline-light px-5 py-3 rounded-0">
            DISCOVER THE COLLECTION
          </Link>
        </div>
      </header>

      <section className="features text-center">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="mb-3"><i className="bi bi-flower1 feature-icon" /></div>
              <h5 className="fw-bold">Natural Ingredients</h5>
              <p className="small text-muted px-lg-4">Carefully selected botanical extracts.</p>
            </div>
            <div className="col-md-4 border-start border-end border-light-subtle">
              <div className="mb-3"><i className="bi bi-shield-check feature-icon" /></div>
              <h5 className="fw-bold">Clinically Tested</h5>
              <p className="small text-muted px-lg-4">Dermatologically tested for safety.</p>
            </div>
            <div className="col-md-4">
              <div className="mb-3"><i className="bi bi-recycle feature-icon" /></div>
              <h5 className="fw-bold">Eco-Sustainable</h5>
              <p className="small text-muted px-lg-4">Recyclable packaging and sustainable processes.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        ctaTo="/shop?filter=new"
        ctaLabel="Discover New in"
        bgClass="bg-light"
      />
      <ProductSection
        title="Bestsellers"
        products={bestsellers}
        ctaTo="/shop?filter=bestsellers"
        ctaLabel="Shop All Bestsellers"
      />
      <ProductSection
        title="Featured Products"
        products={featured}
        ctaTo="/shop"
        ctaLabel="View All Products"
        bgClass="bg-light"
      />
    </>
  )
}

interface ProductSectionProps {
  title: string
  products: Product[]
  ctaTo: string
  ctaLabel: string
  bgClass?: string
}

function ProductSection({ title, products, ctaTo, ctaLabel, bgClass = '' }: ProductSectionProps) {
  return (
    <section className={`py-5 ${bgClass}`}>
      <div className="container my-5">
        <h2 className="text-center mb-5 display-5 fw-bold">{title}</h2>
        <div className="row g-4 justify-content-center">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-5">
          <Link to={ctaTo} className="btn btn-outline-dark px-4 py-2">{ctaLabel}</Link>
        </div>
      </div>
    </section>
  )
}
