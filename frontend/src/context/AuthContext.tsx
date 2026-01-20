import { createContext } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
}

export type AuthState = {
  user: User | null;
  accessToken: string | null;
}

export type AuthContextType = AuthState & {
  login: (data: AuthState) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
