"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    initials: string;
    role?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClose = () => setIsOpen(false);

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    console.log("Signing out...");
    router.push("/sign-in");
  };

  const menuItems = [
    {
      label: "Settings",
      icon: Settings,
      onClick: () => {
        console.log("Navigate to settings");
        handleClose();
      },
    },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl",
          "bg-white border border-slate-200/80 shadow-sm",
          "hover:bg-slate-50 hover:border-slate-300 transition-all duration-200",
          isOpen && "bg-slate-50 border-slate-300",
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-lg bg-[#135CC8] flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-white tracking-wide">
            {user.initials}
          </span>
        </div>
        {/* Name + email — hidden on small screens */}
        <div className="hidden sm:block text-left min-w-0">
          <p className="text-[13px] font-semibold text-[#0F172B] leading-tight truncate max-w-35">
            {user.name}
          </p>
          <p className="text-[11px] text-[#667085] leading-tight truncate max-w-35">
            {user.email}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-[#667085] shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 z-50">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg overflow-hidden">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-[13px] font-semibold text-[#0F172B]">
                  {user.name}
                </p>
                <p className="text-[11px] text-[#667085] mt-0.5">
                  {user.email}
                </p>
                {user.role && (
                  <span className="inline-block mt-1.5 text-[10px] font-semibold text-[#135CC8] bg-blue-50 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                )}
              </div>

              {/* Menu Items */}
              <div className="py-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5",
                        "text-[13px] text-[#0F172B]",
                        "hover:bg-slate-50 transition-colors",
                        "focus:outline-none",
                      )}
                    >
                      <Icon
                        className="w-4 h-4 text-[#667085]"
                        strokeWidth={1.8}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5",
                  "text-[13px] text-red-500",
                  "hover:bg-red-50 transition-colors",
                  "focus:outline-none",
                )}
              >
                <LogOut className="w-4 h-4" strokeWidth={1.8} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
