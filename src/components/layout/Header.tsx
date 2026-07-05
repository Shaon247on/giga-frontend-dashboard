"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";

interface HeaderProps {
  workspaceTitle?: string;
  workspaceSubtitle?: string;
}

// Mock current user — replace with real auth session later
const CURRENT_USER = {
  name: "Mohammad AnaYet",
  email: "manager@gmail.com",
  initials: "MA",
  role: "Supervisor",
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
        {/* Notifications */}
        <NotificationsDropdown />

        {/* User Menu */}
        <UserDropdown user={CURRENT_USER} />
      </div>
    </header>
  );
}