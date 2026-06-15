import type { CartItem } from '../types';   // .. means parent folder

export async function createCart(user: string): Promise<void> {
  const res = await fetch(`/cart/${user}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to create cart: ${res.status}`);
}

export async function getCart(user: string): Promise<CartItem[]> {
  const res = await fetch(`/cart/${user}`);
  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
  return res.json();
}

// Each POST adds exactly one unit. To add N units, the caller loops N times.
// This keeps the server logic simple and the client in control of quantity.
export async function addItem(user: string, productId: number): Promise<void> {
  const res = await fetch(`/cart/${user}/${productId}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
}

// Decrements quantity by 1. If quantity reaches 0 the server removes the entry.
export async function removeOne(user: string, productId: number): Promise<void> {
  const res = await fetch(`/cart/${user}/${productId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
}

// Removes all units of a product in one call, used for the trash button and checkout.
export async function removeAll(user: string, productId: number): Promise<void> {
  const res = await fetch(`/cart/${user}/${productId}/all`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to remove all: ${res.status}`);
}
