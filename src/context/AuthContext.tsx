import React, { createContext, useContext, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthUser {
  userId: string;
  userType: string;
  username: string;
  passwordtype: string;
  partnership: string;
  userTypeInfo: number;
  [k: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  lastLogin: string | null;
  isAuthenticated: boolean;
  login: (token: string, user?: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [token, setToken] = useState<string | null>(() => {
    if (globalThis.window === undefined) return null;
    return globalThis.localStorage.getItem("token");
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (globalThis.window === undefined) return null;
    const raw = globalThis.localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [lastLogin, setLastLogin] = useState<string | null>(() => {
    if (globalThis.window === undefined) return null;
    return globalThis.localStorage.getItem("lastLogin");
  });

  const login = (newToken: string, newUser?: AuthUser) => {
    globalThis.localStorage.setItem("token", newToken);
    setToken(newToken);
    if (newUser) {
      globalThis.localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }
    const now = new Date().toISOString();
    globalThis.localStorage.setItem("lastLogin", now);
    setLastLogin(now);
  };

  const logout = () => {
    globalThis.localStorage.removeItem("token");
    globalThis.localStorage.removeItem("user");
    globalThis.localStorage.removeItem("lastLogin");
    setToken(null);
    setUser(null);
    setLastLogin(null);
  };

  const value = useMemo(
    () => ({ token, user, lastLogin, isAuthenticated: !!token, login, logout }),
    [token, user, lastLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
