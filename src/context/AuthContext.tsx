import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { logoutApi } from "../api/auth";
import FlashMessage from "../components/FlashMessage";

interface AuthUser {
  userId: string;
  userType: number;
  username: string;
  passwordtype: string;
  partnership: string;
  userTypeInfo: number;
  [k: string]: any;
}

interface Flash {
  message: string;
  type: "success" | "error";
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  lastLogin: string | null;
  isAuthenticated: boolean;
  login: (token: string, user?: AuthUser) => void;
  logout: (message?: string) => void;
  softLogout: (message?: string) => void;
  flash: Flash | null;
  setFlash: React.Dispatch<React.SetStateAction<Flash | null>>;
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
  const [flash, setFlash] = useState<Flash | null>(null);

  const login = (newToken: string, newUser?: AuthUser) => {
    globalThis.localStorage.setItem("token", newToken);
    setToken(newToken);
    if (newUser) {
      globalThis.localStorage.setItem("user", JSON.stringify(newUser));
      globalThis.localStorage.setItem("userType", String(newUser.userType));
      globalThis.localStorage.setItem(
        "userTypeInfo",
        newUser.userTypeInfo.toString()
      );
      setUser(newUser);
    }
    const now = new Date().toISOString();
    globalThis.localStorage.setItem("lastLogin", now);
    setLastLogin(now);
  };

  const logout = async (message?: string) => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      globalThis.localStorage.removeItem("token");
      globalThis.localStorage.removeItem("user");
      globalThis.localStorage.removeItem("lastLogin");
      globalThis.localStorage.removeItem("userType");
      globalThis.localStorage.removeItem("userTypeInfo");
      setToken(null);
      setUser(null);
      setLastLogin(null);
      if (message) {
        setFlash({ message, type: "error" });
      }
    }
  };

  const softLogout = (message?: string) => {
    globalThis.localStorage.removeItem("token");
    globalThis.localStorage.removeItem("user");
    globalThis.localStorage.removeItem("lastLogin");
    globalThis.localStorage.removeItem("userType");
    globalThis.localStorage.removeItem("userTypeInfo");
    setToken(null);
    setUser(null);
    setLastLogin(null);
    if (message) {
      setFlash({ message, type: "error" });
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      lastLogin,
      isAuthenticated: !!token,
      login,
      logout,
      softLogout,
      flash,
      setFlash
    }),
    [token, user, lastLogin, flash]
  );

  return (
    <AuthContext.Provider value={value}>
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
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
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.passwordtype === "old" && location.pathname !== "/changepassword") {
    return <Navigate to="/changepassword" replace />;
  }

  return <>{children}</>;
};
