import { Users, Clock, Fuel, DollarSign, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OverviewStatCard } from "../types";

const ICON_MAP: Record<OverviewStatCard["iconVariant"], { icon: LucideIcon; bg: string; color: string }> = {
  employees: { icon: Users,     bg: "bg-slate-100",  color: "text-slate-500"  },
  clocked:   { icon: Clock,     bg: "bg-emerald-50", color: "text-emerald-500" },
  fuel:      { icon: Fuel,      bg: "bg-amber-50",   color: "text-amber-500"  },
  expenses:  { icon: DollarSign,bg: "bg-blue-50",    color: "text-blue-500"   },
};

export function OverviewStatCards({ cards }: { cards: OverviewStatCard[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const { icon: Icon, bg, color } = ICON_MAP[card.iconVariant];
        return (
          <div key={card.id} className="space-y-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm px-4 py-3.5">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
              <Icon className={cn("w-4.5 h-4.5", color)} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-primary-txt leading-tight">{card.value}</p>
              <p className="text-[11px] text-secondary-txt leading-tight mt-0.5">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}