import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getStorage, setStorage, removeStorage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getStorage("auth_user", null);
    const savedToken = getStorage("auth_token", "");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = ({ userData, accessToken }) => {
    setUser(userData);
    setToken(accessToken);

    setStorage("auth_user", userData);
    setStorage("auth_token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");

    removeStorage("auth_user");
    removeStorage("auth_token");
  };

  const value = useMemo(() => {
    return {
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated: !!token,
    };
  }, [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}