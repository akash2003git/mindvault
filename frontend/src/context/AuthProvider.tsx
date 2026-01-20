import { type User, type AuthState, AuthContext } from "./AuthContext.tsx";
import { useState } from "react";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored).user : null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored).accessToken : null;
  });

  const login = (data: AuthState) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
