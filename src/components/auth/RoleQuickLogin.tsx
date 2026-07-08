"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/constants/navigation";

interface RoleQuickLoginProps {
  className?: string;
  onLogin?: () => void;
}

const ROLE_COLORS = {
  employer: {
    bg: "bg-purple-50 hover:bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  admin: {
    bg: "bg-blue-50 hover:bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  supervisor: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  accounts: {
    bg: "bg-amber-50 hover:bg-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  employee: {
    bg: "bg-slate-50 hover:bg-slate-100",
    border: "border-slate-200",
    text: "text-slate-700",
  },
};

const ROLE_LABELS = {
  employer: "👑 Employer",
  admin: "🛡️ Admin",
  supervisor: "📋 Supervisor",
  accounts: "💰 Accounts",
  employee: "👤 Employee",
};

export function RoleQuickLogin({ className, onLogin }: RoleQuickLoginProps) {
  const { setRole } = useAuth();

  const handleQuickLogin = (role: string) => {
    // Just set the role - no mock user needed
    setRole(role as UserRole);
    onLogin?.();
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-secondary-txt uppercase tracking-wide">
          Quick Login
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(ROLE_COLORS)
          .slice(0, 3)
          .map(([role, colors]) => (
            <Button
              key={role}
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin(role)}
              className={cn(
                "h-10 text-xs font-medium border-2 transition-all duration-200",
                "hover:scale-105 active:scale-95",
                colors.bg,
                colors.border,
                colors.text,
              )}
            >
              {ROLE_LABELS[role as keyof typeof ROLE_LABELS]}
            </Button>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(ROLE_COLORS)
          .slice(3, 5)
          .map(([role, colors]) => (
            <Button
              key={role}
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin(role)}
              className={cn(
                "h-10 text-xs font-medium border-2 transition-all duration-200",
                "hover:scale-105 active:scale-95",
                colors.bg,
                colors.border,
                colors.text,
              )}
            >
              {ROLE_LABELS[role as keyof typeof ROLE_LABELS]}
            </Button>
          ))}
      </div>

      <p className="text-[10px] text-center text-secondary-txt">
        Quick login for demo purposes only
      </p>
    </div>
  );
}
