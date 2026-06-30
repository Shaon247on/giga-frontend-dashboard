"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

interface HeaderProps {
  workspaceTitle?: string;
  workspaceSubtitle?: string;
}

// Mock current user — replace with real auth session later
const CURRENT_USER = {
  name: "Mohammad AnaYet",
  email: "manager@gmail.com",
  initials: "MA",
};

export function Header({
  workspaceTitle = "Supervisor Workspace",
  workspaceSubtitle = "Operations management platform",
}: HeaderProps) {
  const { toggle } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center h-18 px-5 gap-4",
        "bg-card backdrop-blur-md",
        "border-b border-slate-200/60"
      )}
    >
      {/* Mobile hamburger */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-200/70 transition-colors text-[#667085]"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── Workspace info ── */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[15px] font-semibold text-[#0F172B] leading-tight truncate">
          {workspaceTitle}
        </h1>
        <p className="text-[12px] text-[#667085] leading-tight truncate mt-0.5">
          {workspaceSubtitle}
        </p>
      </div>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification bell */}
        <button
          className={cn(
            "relative w-10 h-10 rounded-xl flex items-center justify-center",
            "bg-white border border-slate-200/80 shadow-sm",
            "hover:bg-slate-50 hover:border-slate-300 transition-all duration-200",
            "text-[#667085] hover:text-[#0F172B]"
          )}
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" strokeWidth={1.8} />
          {/* Unread dot */}
          <span
            className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-red-500"
            aria-hidden="true"
          />
        </button>

        {/* User menu */}
        <button
          className={cn(
            "flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl",
            "bg-white border border-slate-200/80 shadow-sm",
            "hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          )}
          aria-label="User menu"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-lg bg-[#135CC8] flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-white tracking-wide">
              {CURRENT_USER.initials}
            </span>
          </div>
          {/* Name + email — hidden on small screens */}
          <div className="hidden sm:block text-left min-w-0">
            <p className="text-[13px] font-semibold text-[#0F172B] leading-tight truncate max-w-35DashboardShell.tsx">
              {CURRENT_USER.name}
            </p>
            <p className="text-[11px] text-[#667085] leading-tight truncate max-w-35DashboardShell.tsx">
              {CURRENT_USER.email}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#667085] shrink-0" />
        </button>
      </div>
    </header>
  );
}