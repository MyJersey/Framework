import type { RegisteredUser } from '../types';

const SESSION_KEY = 'userSession';
const CREDENTIALS_KEY = 'userCredentials';

interface StoredCredentials extends RegisteredUser {
  password: string;
}

// Session: tracks who is currently logged in (cleared on logout).
export function getStoredUser(): RegisteredUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegisteredUser;
  } catch {
    return null;
  }
}

export function storeUser(user: RegisteredUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function removeUser(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Credentials: permanent record that survives logout, used by login to verify.
export function isEmailRegistered(email: string): boolean {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return false;
  try {
    const creds = JSON.parse(raw) as StoredCredentials;
    return creds.email === email;
  } catch {
    return false;
  }
}

export function storeCredentials(user: RegisteredUser, password: string): void {
  const creds: StoredCredentials = { ...user, password };
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
}

export function checkCredentials(email: string, password: string): RegisteredUser | null {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return null;
  try {
    const creds = JSON.parse(raw) as StoredCredentials;
    if (creds.email === email && creds.password === password) {
      return { firstName: creds.firstName, familyName: creds.familyName, email: creds.email };
    }
    return null;
  } catch {
    return null;
  }
}
