import { AdminStatCards } from "./AdminStatCards";
import { AdminQuickAccessGrid } from "./AdminQuickAccessGrid";
import type { AdminDashboardData } from "../types";

interface AdminDashboardViewProps {
  data: AdminDashboardData;
}

export function AdminDashboardView({ data }: AdminDashboardViewProps) {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Tuesday, June 9, 2026 — Office Operations
        </p>
      </div>

      {/* Stat Cards */}
      <AdminStatCards cards={data.statCards} />

      {/* Employee Count */}
      <div className="flex items-center gap-2">
        <span className="text-[15px] font-semibold text-primary-txt">
          {data.employeeCount} employees
        </span>
      </div>

      {/* Quick Access Cards */}
      <AdminQuickAccessGrid cards={data.quickAccessCards} />

      {/* Records Count */}
      {/* <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
        <span className="text-[13px] font-semibold text-primary-txt">
          {data.recordsCount} records
        </span>
      </div> */}
    </div>
  );
}