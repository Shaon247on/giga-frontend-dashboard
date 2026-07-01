import { cn } from "@/lib/utils";
import { ADMIN_STAT_ICONS, STAT_CARD_STYLES } from "../constants";
import type { AdminStatCard } from "../types";

interface AdminStatCardsProps {
  cards: AdminStatCard[];
}

export function AdminStatCards({ cards }: AdminStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = ADMIN_STAT_ICONS[card.icon];
        const styles = STAT_CARD_STYLES[card.icon];

        return (
          <div
            key={card.id}
            className={cn(
              "flex items-start gap-4 p-5 rounded-2xl bg-white border-2",
              "shadow-sm transition-shadow duration-200 hover:shadow-md",
              styles.border
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                styles.bg
              )}
            >
              <Icon className={cn("w-5 h-5", styles.iconColor)} strokeWidth={1.8} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-primary-txt leading-none">
                {card.count}
              </p>
              <p className="text-[13px] font-semibold text-primary-txt mt-1 leading-tight">
                {card.label}
              </p>
              {card.subtitle && (
                <p className="text-[11px] text-secondary-txt mt-0.5 leading-tight">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}