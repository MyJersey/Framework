import type { Product } from '../types';

export async function getCategories(): Promise<string[]> {
  const res = await fetch('/categories');
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
}

interface CategoryFilters {
  skin?: string;
  collection?: string;
}

export async function getProductsByCategory(
  category: string,
  filters: CategoryFilters = {}
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.skin) params.set('skin', filters.skin);
  if (filters.collection) params.set('collection', filters.collection);

  const query = params.toString();
  // encodeURIComponent handles category names that might contain spaces
  const res = await fetch(`/categories/${encodeURIComponent(category)}/products${query ? '?' + query : ''}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category "${category}": ${res.status}`);
  return res.json();
}
