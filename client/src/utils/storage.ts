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

// Credentials: permanent array that survives logout, used by login to verify.
// Stored as an array so multiple users can register independently.
function readAllCredentials(): StoredCredentials[] {
  const raw = localStorage.getItem(CREDENTIALS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    // Handle old format: a single credentials object instead of an array.
    if (!Array.isArray(parsed)) return [parsed as StoredCredentials];
    return parsed as StoredCredentials[];
  } catch {
    return [];
  }
}

export function isEmailRegistered(email: string): boolean {
  return readAllCredentials().some(c => c.email === email);
}

export function storeCredentials(user: RegisteredUser, password: string): void {
  const creds = readAllCredentials();
  creds.push({ ...user, password });
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
}

export function checkCredentials(email: string, password: string): RegisteredUser | null {
  const match = readAllCredentials().find(
    c => c.email === email && c.password === password
  );
  if (!match) return null;
  return { firstName: match.firstName, familyName: match.familyName, email: match.email };
}
