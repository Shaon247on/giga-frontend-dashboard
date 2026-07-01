import { AlertTriangle, Clock, CheckCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AttendanceStatCard } from "../types";

const ICON_MAP: Record<
  AttendanceStatCard["iconVariant"],
  { icon: LucideIcon; color: string; border: string; bg: string }
> = {
  pending: {
    icon: AlertTriangle,
    color: "text-amber-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
  },
  manual: {
    icon: Clock,
    color: "text-blue-500",
    border: "border-blue-300",
    bg: "bg-blue-50",
  },
  active: {
    icon: CheckCircle,
    color: "text-emerald-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
  },
};

interface AttendanceStatCardsProps {
  cards: AttendanceStatCard[];
}

export function AttendanceStatCards({ cards }: AttendanceStatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => {
        const { icon: Icon, color, border, bg } = ICON_MAP[card.iconVariant];
        return (
          <div
            key={card.id}
            className={cn(
              "flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border-2",
              "shadow-sm transition-shadow duration-200 hover:shadow-md",
              border
            )}
          >
            {/* Icon */}
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
              <Icon className={cn("w-5 h-5", color)} strokeWidth={1.8} />
            </div>
            {/* Text */}
            <div>
              <p className="text-2xl font-bold text-[#0F172B] leading-none">{card.count}</p>
              <p className="text-[12px] text-[#667085] mt-1 leading-tight">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}