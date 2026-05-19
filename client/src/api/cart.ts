import type { CartItem } from '../types';

export async function createCart(user: string): Promise<void> {
  await fetch(`/cart/${user}`, { method: 'POST' });
}

export async function getCart(user: string): Promise<CartItem[]> {
  const res = await fetch(`/cart/${user}`);
  return res.json();
}

export async function addItem(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}`, { method: 'POST' });
}

export async function removeOne(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}`, { method: 'DELETE' });
}

export async function removeAll(user: string, productId: number): Promise<void> {
  await fetch(`/cart/${user}/${productId}/all`, { method: 'DELETE' });
}
