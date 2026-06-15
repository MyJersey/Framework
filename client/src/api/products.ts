import type { Product } from '../types';

// local interface
interface ProductFilters {
  skin?: string;
  collection?: string;
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  // if no filters are passed the query string is omitted entirely
  const params = new URLSearchParams();   // build URL query string "?..."
  if (filters.skin) params.set('skin', filters.skin);
  if (filters.collection) params.set('collection', filters.collection);

  const query = params.toString();
  const res = await fetch(`/products${query ? '?' + query : ''}`);  // http request
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}
