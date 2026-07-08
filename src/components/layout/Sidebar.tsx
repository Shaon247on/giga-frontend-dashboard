"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  SIGN_OUT_ITEM,
  ROLE_NAV_MAP,
  type UserRole,
  ROLE_BOTTOM_NAV_MAP,
} from "@/constants/navigation";
import { LogOut, X, Flame } from "lucide-react";
import { useRole } from "@/hooks/useRole";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
const { role } = useRole();
  // ── Temporary: Set current user role ──
  // TODO: Replace with actual user from session
  // const [currentRole] = useState<UserRole>("admin");

  console.log("role:",role)

  if(role === null) return

  // Get navigation items based on role
  const navItems = ROLE_NAV_MAP[role] || ROLE_NAV_MAP.admin;
  const navItemsBottom = ROLE_BOTTOM_NAV_MAP[role] || ROLE_BOTTOM_NAV_MAP.admin;

  const isActive = (href: string) => {
    // Exact match for dashboard routes
    if (href === "/dashboard" || href === "/admin" || href === "/accounts" || href === "/employer") {
      return pathname === href;
    }
    // For all other routes, check if pathname starts with the href
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          // Base
          "fixed top-0 left-0 z-50 flex h-full w-70 flex-col",
          "border-r border-slate-200/60",
          // Background matches design: #E2E8F0CC
          "bg-card backdrop-blur-md",
          // Desktop: always visible, static in flow
          "lg:static lg:z-auto lg:w-full lg:translate-x-0 lg:backdrop-blur-none",
          // Mobile: slide in/out
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Main navigation"
      >
        {/* ── Logo / Brand ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200/60">
          <Link href={role === "supervisor" ? "/dashboard" : `/${role}`} className="flex items-center gap-3 min-w-0">
            {/* Logo mark */}
            <div className="shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-200/80">
              <Flame className="w-6 h-6 text-orange-500" strokeWidth={2} />
            </div>
            {/* Brand text */}
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#135CC8] leading-tight tracking-tight truncate">
                GTS&apos;S FINEST
              </p>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={close}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors text-[#667085]"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Role Indicator ── */}
        <div className="px-4 py-2 border-b border-slate-200/40">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-100/70">
            <span className="text-[10px] font-semibold text-secondary-txt uppercase tracking-wider">
              {role}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-secondary-txt">Active</span>
          </div>
        </div>

        {/* ── Main Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-200 ease-in-out",
                  active
                    ? "bg-[#135CC8] text-white shadow-sm shadow-blue-200"
                    : "text-[#0F172B] hover:bg-slate-200/70 hover:text-[#135CC8]",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "w-4.5 h-4.5 shrink-0",
                    active ? "text-white" : "text-[#667085]",
                  )}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span className="leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Bottom: Settings + Sign Out ── */}
        <div className="px-3 pb-5 border-t border-slate-200/60 pt-3 space-y-0.5">
          {navItemsBottom.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-200 ease-in-out",
                  active
                    ? "bg-[#135CC8] text-white shadow-sm"
                    : "text-[#0F172B] hover:bg-slate-200/70 hover:text-[#135CC8]",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "w-4.5 h-4.5 shrink-0",
                    active ? "text-white" : "text-[#667085]",
                  )}
                  strokeWidth={1.8}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Sign Out */}
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium",
              "text-red-500 hover:bg-red-50 transition-all duration-200 ease-in-out",
            )}
            onClick={() => {
              /* TODO: wire up auth signout */
            }}
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" strokeWidth={1.8} />
            <span>{SIGN_OUT_ITEM.label}</span>
          </button>
        </div>
      </aside>
    </>
  );
}