import Link from "next/link";
import {
  Users,
  DollarSign,
  Wrench,
  CalendarOff,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmployerStatCard } from "../types";

const ICON_CONFIG: Record<
  EmployerStatCard["iconVariant"],
  { icon: LucideIcon; iconBg: string; iconColor: string; border: string; linkColor: string }
> = {
  employees: {
    icon: Users,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    border: "border-slate-200",
    linkColor: "text-slate-700 font-bold",
  },
  expenses: {
    icon: DollarSign,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    border: "border-amber-200",
    linkColor: "text-amber-600 font-bold",
  },
  vehicles: {
    icon: Wrench,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
    border: "border-red-200",
    linkColor: "text-red-500 font-bold",
  },
  timeoff: {
    icon: CalendarOff,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-400",
    border: "border-violet-200",
    linkColor: "text-violet-500 font-bold",
  },
};

interface EmployerStatCardsProps {
  cards: EmployerStatCard[];
}

export function EmployerStatCards({ cards }: EmployerStatCardsProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const { icon: Icon, iconBg, iconColor, border, linkColor } =
          ICON_CONFIG[card.iconVariant];

        return (
          <div
            key={card.id}
            className={cn(
              "flex flex-col gap-3 rounded-2xl bg-white p-5",
              "border shadow-sm hover:shadow-md transition-shadow duration-200",
              border,
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                iconBg,
              )}
            >
              <Icon className={cn("w-5 h-5", iconColor)} strokeWidth={1.8} />
            </div>

            {/* Value */}
            <div>
              <p className="text-[26px] sm:text-[28px] font-bold text-primary-txt leading-none tracking-tight">
                {card.value}
              </p>
              <p className="text-[12px] text-secondary-txt mt-1.5 leading-tight">
                {card.sublabel}
              </p>
            </div>

            {/* Colored link label */}
            <Link
              href={card.linkHref}
              className={cn(
                "text-[12px] leading-tight hover:underline transition-colors",
                linkColor,
              )}
            >
              {card.linkLabel}
            </Link>
          </div>
        );
      })}
    </div>
  );
}