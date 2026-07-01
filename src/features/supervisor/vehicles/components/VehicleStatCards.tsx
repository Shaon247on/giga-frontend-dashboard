import { AlertCircle, Activity, CheckCircle2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VehicleStatCard } from "../types";

const ICON_MAP: Record<
  VehicleStatCard["iconVariant"],
  { icon: LucideIcon; color: string; border: string; bg: string }
> = {
  open: {
    icon: AlertCircle,
    color: "text-orange-400",
    border: "border-orange-300",
    bg: "bg-orange-50",
  },
  "in-progress": {
    icon: Activity,
    color: "text-blue-500",
    border: "border-blue-300",
    bg: "bg-blue-50",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
  },
};

interface VehicleStatCardsProps {
  cards: VehicleStatCard[];
}

export function VehicleStatCards({ cards }: VehicleStatCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 cursor-pointer">
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