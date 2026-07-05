import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeeklyHoursBar } from "../types";

const MAX_HOURS = 80;

export function CompanyHoursChart({ bars }: { bars: WeeklyHoursBar[] }) {
  const yLabels = [0, 20, 40, 60, 80];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-primary-txt" strokeWidth={2} />
        <h3 className="text-[14px] font-bold text-primary-txt">
          Company Hours — This Week
        </h3>
      </div>

      {/* Chart area */}
      <div className="flex gap-3">
        {/* Y-axis labels */}
        <div className="flex flex-col-reverse justify-between text-[10px] text-secondary-txt pr-1 pb-6" style={{ height: 160 }}>
          {yLabels.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end gap-2 sm:gap-3" style={{ height: 160 }}>
          {bars.map((bar) => {
            const heightPct = (bar.hours / MAX_HOURS) * 100;
            const isEmpty = bar.hours === 0;
            return (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end" style={{ height: 136 }}>
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-all duration-300",
                      isEmpty ? "bg-slate-100" : "bg-[#0F172B]",
                    )}
                    style={{ height: isEmpty ? 4 : `${heightPct}%` }}
                    title={`${bar.day}: ${bar.hours} hrs`}
                  />
                </div>
                <span className="text-[10px] text-secondary-txt">{bar.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}