import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Define the type for the user object
interface User {
  _id: string;
  username: string;
  email: string;
  // Add any other user properties that your API returns
}

// Explicitly define the types for the atoms
export const accessTokenAtom = atomWithStorage<string | null>(
  "accessToken",
  null,
);
export const userAtom = atomWithStorage<User | null>("user", null);

export const isUserAuthenticatedAtom = atom(
  (get) => get(accessTokenAtom) !== null && get(userAtom) !== null,
);
