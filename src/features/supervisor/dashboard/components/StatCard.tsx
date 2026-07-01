import { cn } from "@/lib/utils";
import type { StatCard as StatCardType } from "../types";
import {
  Users,
  AlertTriangle,
  CalendarOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Icon config per variant
const ICON_CONFIG: Record<
  StatCardType["iconVariant"],
  { icon: LucideIcon; bg: string; color: string }
> = {
  employees: {
    icon: Users,
    bg: "bg-emerald-50",
    color: "text-emerald-500",
  },
  review: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    color: "text-amber-500",
  },
  requests: {
    icon: CalendarOff,
    bg: "bg-violet-50",
    color: "text-violet-500",
  },
  repair: {
    icon: Wrench,
    bg: "bg-orange-50",
    color: "text-orange-400",
  },
};

interface StatCardProps {
  card: StatCardType;
  className?: string;
}

export function StatCard({ card, className }: StatCardProps) {
  const { icon: Icon, bg, color } = ICON_CONFIG[card.iconVariant];

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl p-5",
        "bg-card border border-slate-200/60",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      {/* Icon */}
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
        <Icon className={cn("w-5 h-5", color)} strokeWidth={1.8} />
      </div>

      {/* Count */}
      <div>
        <p className="text-4xl font-bold text-[#0F172B] leading-none tracking-tight">
          {card.count}
        </p>
        <p className="text-sm text-[#667085] mt-1.5 leading-tight font-medium">
          {card.label}
        </p>
      </div>

      {/* Sub-label */}
      <p className="text-xs text-[#90A1B9] leading-tight">{card.sublabel}</p>
    </div>
  );
}