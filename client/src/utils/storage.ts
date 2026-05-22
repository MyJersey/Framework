import type { RegisteredUser } from '../types';

// All localStorage access for the registered user goes through these three
// functions. Centralising it means the key name and serialisation format
// only need to change in one place.
const USER_KEY = 'registeredUser';

export function getStoredUser(): RegisteredUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegisteredUser;
  } catch {
    // JSON.parse throws if the stored string is malformed.
    // Return null rather than crashing the whole app.
    return null;
  }
}

export function storeUser(user: RegisteredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY);
}
