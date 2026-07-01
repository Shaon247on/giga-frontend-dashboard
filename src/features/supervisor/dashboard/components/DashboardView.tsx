import { StatCard } from "./StatCard";
import { RecentAlertsPanel } from "./RecentAlertsPanel";
import { TodaysAttendancePanel } from "./TodaysAttendancePanel";
import type { DashboardData } from "../types";

interface DashboardViewProps {
  data: DashboardData;
}

export function DashboardView({ data }: DashboardViewProps) {
  const { greeting, dateLabel, statCards, recentAlerts, newAlertCount, todaysAttendance } =
    data;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* ── Greeting ── */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172B] leading-tight">
          {greeting}
        </h1>
        <p className="text-sm text-[#667085] mt-1.5 font-medium">{dateLabel}</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>

      {/* ── Lower panels: Alerts | Attendance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentAlertsPanel alerts={recentAlerts} newCount={newAlertCount} />
        <TodaysAttendancePanel rows={todaysAttendance} />
      </div>
    </div>
  );
}