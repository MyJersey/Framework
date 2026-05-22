import type { CartItem } from '../types';

export async function createCart(user: string): Promise<void> {
  await fetch(`/cart/${user}`, { method: 'POST' });
}

export async function getCart(user: string): Promise<CartItem[]> {
  const res = await fetch(`/cart/${user}`);
  return res.json();
}

// Each POST adds exactly one unit. To add N units, the caller loops N times.
// This keeps the server logic simple and the client in control of quantity.
export async function addItem(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}`, { method: 'POST' });
}

// Decrements quantity by 1. If quantity reaches 0 the server removes the entry.
export async function removeOne(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}`, { method: 'DELETE' });
}

// Removes all units of a product in one call, used for the trash button and checkout.
export async function removeAll(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}/all`, { method: 'DELETE' });
}
