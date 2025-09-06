import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface User {
  _id: string;
  username: string;
  email: string;
}

// Custom storage for plain strings (handles null correctly)
const stringStorage = {
  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string | null): void => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};

// Access token stored as raw string (no extra quotes)
export const accessTokenAtom = atomWithStorage<string | null>(
  "accessToken",
  null,
  stringStorage,
);

// User stored as JSON (default works fine)
export const userAtom = atomWithStorage<User | null>("user", null);

// Derived atom for convenience
export const isUserAuthenticatedAtom = atom(
  (get) => get(accessTokenAtom) !== null && get(userAtom) !== null,
);
