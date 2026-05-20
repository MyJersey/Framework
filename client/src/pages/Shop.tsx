import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts } from '../api/products'
import { getCategories, getProductsByCategory } from '../api/categories'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

const SKIN_TYPES = ['Sensitive', 'Dry', 'Combination', 'Oily', 'Mature', 'All types']
const COLLECTIONS = [
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'new', label: 'New Arrivals' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initialCollection = searchParams.get('filter')

  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState('all')
  const [skins, setSkins] = useState<string[]>([])
  const [collections, setCollections] = useState<string[]>(
    initialCollection === 'bestsellers' || initialCollection === 'new'
      ? [initialCollection]
      : []
  )
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    const filters = {
      skin: skins.length ? skins.join(',') : undefined,
      collection: collections.length ? collections.join(',') : undefined,
    }
    const request = category === 'all'
      ? getAllProducts(filters)
      : getProductsByCategory(category, filters)
    request.then(setProducts).catch(() => setProducts([]))
  }, [category, skins, collections])

  function toggleSkin(value: string) {
    setSkins(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    )
  }

  function toggleCollection(value: string) {
    setCollections(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    )
  }

  return (
    <div className="container my-5">
      <div className="row">
        <aside className="col-lg-3 mb-5">
          <div className="p-4 bg-light shadow-sm">
            <h5 className="fw-bold mb-4">Filter Products</h5>

            <div className="mb-4">
              <label className="form-label fw-semibold" htmlFor="categoryFilter">Category</label>
              <select
                id="categoryFilter"
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="all">All Products</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Skin Type</label>
              {SKIN_TYPES.map(type => (
                <div className="form-check" key={type}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`skin-${type}`}
                    checked={skins.includes(type)}
                    onChange={() => toggleSkin(type)}
                  />
                  <label className="form-check-label" htmlFor={`skin-${type}`}>
                    {type === 'All types' ? type : `${type} Skin`}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Collections</label>
              {COLLECTIONS.map(({ value, label }) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`col-${value}`}
                    checked={collections.includes(value)}
                    onChange={() => toggleCollection(value)}
                  />
                  <label className="form-check-label" htmlFor={`col-${value}`}>{label}</label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="col-lg-9">
          <div className="row g-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </main>
      </div>
    </div>
  )
}
