import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface User {
  _id: string;
  username: string;
  email: string;
}

export const accessTokenAtom = atomWithStorage<string | null>(
  "accessToken",
  null,
);
export const userAtom = atomWithStorage<User | null>("user", null);

export const isUserAuthenticatedAtom = atom(
  (get) => get(accessTokenAtom) !== null && get(userAtom) !== null,
);
