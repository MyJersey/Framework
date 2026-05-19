import type { Product } from '../types';

interface ProductFilters {
  skin?: string;
  collection?: string;
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.skin) params.set('skin', filters.skin);
  if (filters.collection) params.set('collection', filters.collection);

  const query = params.toString();
  const res = await fetch(`/products${query ? '?' + query : ''}`);
  return res.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}
