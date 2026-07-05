"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  ACCOUNTS_QUICK_ICONS,
  QUICK_ICON_STYLES,
} from "../constants";

import type { AccountsQuickAccessCard as AccountsQuickAccessCardType } from "../types";

interface AccountsQuickAccessCardProps {
  card: AccountsQuickAccessCardType;
}

export function AccountsQuickAccessCard({
  card,
}: AccountsQuickAccessCardProps) {
  const Icon = ACCOUNTS_QUICK_ICONS[card.icon];

  const iconStyle = QUICK_ICON_STYLES[card.icon];

  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg"
      )}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border bg-white shadow-sm",
            iconStyle
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>

        <div className="text-right">
          <h3 className="text-4xl font-bold leading-none text-primary-txt">
            ${card.amount}
          </h3>

          <p className="mt-1 text-sm text-secondary-txt">
            {card.entries} entries
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8 flex-1">
        <h2 className="text-2xl font-bold text-primary-txt">
          {card.title}
        </h2>

        <p className="mt-3 text-[15px] leading-7 text-secondary-txt">
          {card.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-base font-semibold text-btn-primary",
            "transition-all duration-200 group-hover:gap-3"
          )}
        >
          Open

          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}