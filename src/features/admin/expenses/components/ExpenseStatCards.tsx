import { AlertTriangle, Clock, CheckCircle, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExpenseStat } from "../types";

const ICON_MAP = {
  pending: {
    icon: AlertTriangle,
    color: "text-amber-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
  },
  reviewed: {
    icon: Clock,
    color: "text-blue-500",
    border: "border-blue-300",
    bg: "bg-blue-50",
  },
  paid: {
    icon: CheckCircle,
    color: "text-emerald-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
  },
  total: {
    icon: DollarSign,
    color: "text-purple-500",
    border: "border-purple-300",
    bg: "bg-purple-50",
  },
};

interface ExpenseStatCardsProps {
  stats: ExpenseStat[];
}

export function ExpenseStatCards({ stats }: ExpenseStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const { icon: Icon, color, border, bg } = ICON_MAP[stat.icon];
        const isTotal = stat.icon === "total";
        
        return (
          <div
            key={stat.label}
            className={cn(
              "flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border-2",
              "shadow-sm transition-shadow duration-200 hover:shadow-md",
              border
            )}
          >
            {/* Icon */}
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", bg)}>
              <Icon className={cn("w-5 h-5", color)} strokeWidth={1.8} />
            </div>
            {/* Text */}
            <div>
              <p className="text-2xl font-bold text-[#0F172B] leading-none">
                {isTotal ? `$${stat.amount?.toFixed(2)}` : stat.count}
              </p>
              <p className="text-[12px] text-[#667085] mt-1 leading-tight">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}