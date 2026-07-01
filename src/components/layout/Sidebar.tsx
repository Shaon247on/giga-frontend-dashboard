"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { MAIN_NAV, BOTTOM_NAV, SIGN_OUT_ITEM } from "@/constants/navigation";
import { LogOut, X, Flame } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
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
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
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

        {/* ── Main Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {MAIN_NAV.map((item) => {
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
          {BOTTOM_NAV.map((item) => {
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
