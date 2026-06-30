import { Clock, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimeOffStatCard } from "../types";

const ICON_MAP: Record<
  TimeOffStatCard["iconVariant"],
  { icon: LucideIcon; color: string; border: string; bg: string }
> = {
  awaiting: {
    icon: Clock,
    color: "text-amber-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
  },
  approved: {
    icon: CheckCircle2,
    color: "text-btn-accept",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
  },
  denied: {
    icon: XCircle,
    color: "text-btn-reject",
    border: "border-red-300",
    bg: "bg-red-50",
  },
};

interface TimeOffStatCardsProps {
  cards: TimeOffStatCard[];
}

export function TimeOffStatCards({ cards }: TimeOffStatCardsProps) {
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
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
              <Icon className={cn("w-5 h-5", color)} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-txt leading-none">{card.count}</p>
              <p className="text-[12px] text-secondary-txt mt-1 leading-tight">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}