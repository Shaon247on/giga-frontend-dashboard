"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type UserRole =
  | "employer"
  | "admin"
  | "supervisor"
  | "accounts"
  | "employee"
  | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  isActive: boolean;
  isOnboarding: boolean;
  phone?: string;
  emergencyContact?: string;
  notes?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for quick login
const MOCK_USERS: Record<string, User> = {
  employer: {
    id: "1",
    name: "Mohammad AnaYet",
    email: "employer@gigadashboard.com",
    role: "employer",
    initials: "MA",
    isActive: true,
    isOnboarding: false,
    phone: "+1 (613) 555-0001",
  },
  admin: {
    id: "2",
    name: "Diane Patel",
    email: "admin@gigadashboard.com",
    role: "admin",
    initials: "DP",
    isActive: true,
    isOnboarding: false,
    phone: "+1 (613) 555-0002",
  },
  supervisor: {
    id: "3",
    name: "Sandra Kim",
    email: "supervisor@gigadashboard.com",
    role: "supervisor",
    initials: "SK",
    isActive: true,
    isOnboarding: false,
    phone: "+1 (613) 555-0003",
  },
  accounts: {
    id: "4",
    name: "Robert Chen",
    email: "accounts@gigadashboard.com",
    role: "accounts",
    initials: "RC",
    isActive: true,
    isOnboarding: false,
    phone: "+1 (613) 555-0004",
  },
  employee: {
    id: "5",
    name: "Marcus Rivera",
    email: "marcus@fieldops.com",
    role: "employee",
    initials: "MR",
    isActive: true,
    isOnboarding: false,
    phone: "+1 (613) 555-0192",
  },
};

const ROLE_ROUTES: Record<Exclude<UserRole, null>, string> = {
  employer: "/employer",
  admin: "/admin",
  supervisor: "/dashboard",
  accounts: "/accounts",
  employee: "/dashboard",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const storedUser = localStorage.getItem("giga_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window === "undefined") return null;

    return (localStorage.getItem("giga_role") as UserRole) ?? null;
  });

  const [isLoading] = useState(false);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem("giga_user", JSON.stringify(userData));
    localStorage.setItem("giga_role", userData.role as string);
    localStorage.setItem("giga_token", token);

    // Redirect based on role
    if (userData.role) {
      const route =
        ROLE_ROUTES[userData.role as Exclude<UserRole, null>] || "/";
      router.push(route);
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("giga_user");
    localStorage.removeItem("giga_role");
    localStorage.removeItem("giga_token");
    router.push("/sign-in");
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("giga_user", JSON.stringify(updatedUser));
    }
  };

  // Set role directly (for quick login)
  const setUserRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem("giga_role", newRole);
      const route = ROLE_ROUTES[newRole as Exclude<UserRole, null>] || "/";
      router.push(route);
    } else {
      localStorage.removeItem("giga_role");
      router.push("/");
    }
  };

  const value = {
    user,
    role,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    setRole: setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { MOCK_USERS, ROLE_ROUTES };
