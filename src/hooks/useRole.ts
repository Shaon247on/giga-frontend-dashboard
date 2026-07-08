"use client";

import { useAuth } from "@/context/AuthContext";

export type UserRole = 'employer' | 'admin' | 'supervisor' | 'accounts' | 'employee' | null;

export function useRole() {
  const { role, user, setRole, isAuthenticated } = useAuth();

  const isEmployer = role === 'employer';
  const isAdmin = role === 'admin';
  const isSupervisor = role === 'supervisor';
  const isAccounts = role === 'accounts';
  const isEmployee = role === 'employee';

  const hasRole = (allowedRoles: UserRole[]) => {
    if (!role) return false;
    return allowedRoles.includes(role);
  };

  const getDashboardRoute = () => {
    switch (role) {
      case 'employer':
        return '/employer';
      case 'admin':
        return '/admin';
      case 'supervisor':
        return '/dashboard';
      case 'accounts':
        return '/accounts';
      case 'employee':
        return '/dashboard';
      default:
        return '/';
    }
  };

  return {
    role,
    user,
    isEmployer,
    isAdmin,
    isSupervisor,
    isAccounts,
    isEmployee,
    isAuthenticated,
    hasRole,
    getDashboardRoute,
    setRole,
  };
}