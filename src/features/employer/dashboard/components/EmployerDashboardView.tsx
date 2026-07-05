import { TrendingUp } from "lucide-react";
import { EmployerStatCards } from "./EmployerStatCards";
import { EmployerAlertsPanel } from "./EmployerAlertsPanel";
import { EmployerAttendancePanel } from "./EmployerAttendancePanel";
import type { EmployerDashboardData } from "../types";

interface EmployerDashboardViewProps {
  data: EmployerDashboardData;
}

export function EmployerDashboardView({ data }: EmployerDashboardViewProps) {
  const {
    greeting,
    dateLabel,
    activeNowCount,
    statCards,
    alerts,
    newAlertCount,
    todaysAttendance,
  } = data;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto  ">
      {/* ── Page heading ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            {/* Chart icon */}
            <div className="w-9 h-9 rounded-xl bg-primary-txt flex items-center justify-center shrink-0">
              <TrendingUp className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              {greeting}
            </h1>
          </div>
          <p className="text-[13px] text-secondary-txt mt-1.5 ml-12">
            {dateLabel}
          </p>
        </div>

        {/* Active now badge */}
        {activeNowCount > 0 && (
          <span className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              aria-hidden="true"
            />
            {activeNowCount} Active Now
          </span>
        )}
      </div>

      {/* ── Stat cards ── */}
      <EmployerStatCards cards={statCards} />

      {/* ── Lower panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EmployerAlertsPanel alerts={alerts} newCount={newAlertCount} />
        <EmployerAttendancePanel rows={todaysAttendance} />
      </div>
    </div>
  );
}
