import type { RegisteredUser } from '../types';

const USER_KEY = 'registeredUser';

export function getStoredUser(): RegisteredUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegisteredUser;
  } catch {
    return null;
  }
}

export function storeUser(user: RegisteredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY);
}
