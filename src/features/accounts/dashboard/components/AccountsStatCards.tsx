import {
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountsStatCard } from "../types";

const ICON_MAP = {
  total: {
    icon: DollarSign,
    color: "text-purple-600",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  pending: {
    icon: AlertTriangle,
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
  reviewed: {
    icon: Clock,
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  paid: {
    icon: CheckCircle,
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
} as const;

const TREND_MAP = {
  up: {
    icon: TrendingUp,
    color: "text-emerald-600",
    label: "Increasing",
  },
  down: {
    icon: TrendingDown,
    color: "text-red-600",
    label: "Decreasing",
  },
  even: {
    icon: Minus,
    color: "text-slate-500",
    label: "No Change",
  },
} as const;

interface AccountsStatCardsProps {
  cards: AccountsStatCard[];
}

export function AccountsStatCards({ cards }: AccountsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const { icon: Icon, color, border, bg } = ICON_MAP[card.icon];
        const {
          icon: TrendIcon,
          color: trendColor,
          label: trendLabel,
        } = TREND_MAP[card.trend || "up"];

        const isTotal = card.icon === "total";

        return (
          <div
            key={card.id}
            className={cn(
              "rounded-2xl border-2 bg-white px-5 py-4 shadow-sm",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              border,
            )}
          >
            <div className="space-y-4">
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    bg,
                  )}
                >
                  <Icon className={cn("h-5 w-5", color)} strokeWidth={1.8} />
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1.5 pt-1">
                  <TrendIcon
                    className={cn("h-3.5 w-3.5", trendColor)}
                    strokeWidth={2}
                  />

                  <span className={cn("text-[11px] font-semibold", trendColor)}>
                    {"trendValue" in card && card.trendValue
                      ? card.trendValue
                      : trendLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                {isTotal ? (
                  <p className="text-3xl font-bold leading-none text-[#0F172B]">
                    ${card.amount?.toFixed(2)}
                  </p>
                ) : (
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold leading-none text-[#0F172B]">
                      {card.count}
                    </p>

                    {card.amount !== undefined && (
                      <span className="mb-0.5 text-[13px] font-medium leading-none text-secondary-txt">
                        ${card.amount.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}

                <p className="text-[12px] font-semibold leading-tight text-primary-txt">
                  {card.label}
                </p>

                {card.subtitle && (
                  <p className="text-[11px] leading-tight text-secondary-txt">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
