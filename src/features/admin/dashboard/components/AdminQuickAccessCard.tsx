"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_QUICK_ICONS, QUICK_ICON_STYLES } from "../constants";
import type { AdminQuickAccessCard as AdminQuickAccessCardType } from "../types";

interface AdminQuickAccessCardProps {
  card: AdminQuickAccessCardType;
}

export function AdminQuickAccessCard({ card }: AdminQuickAccessCardProps) {
  const Icon = ADMIN_QUICK_ICONS[card.icon];
  const iconStyle = QUICK_ICON_STYLES[card.icon];

  return (
    <Link
      href={card.href}
      className={cn(
        "group flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-slate-200/60",
        "shadow-sm transition-all duration-200",
        "hover:border-btn-primary hover:shadow-md hover:-translate-y-0.5",
        "cursor-pointer"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2",
          iconStyle
        )}
      >
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-primary-txt leading-tight">
          {card.title}
        </h3>
        <p className="text-[12px] text-secondary-txt mt-1 leading-snug line-clamp-2">
          {card.description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight
        className={cn(
          "w-5 h-5 text-secondary-txt shrink-0 transition-all duration-200",
          "group-hover:text-btn-primary group-hover:translate-x-0.5"
        )}
        strokeWidth={2}
      />
    </Link>
  );
}