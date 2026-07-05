import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { EmployerAttendanceRow } from "../types";

const STATUS_COLORS: Record<string, string> = {
  reviewed: "text-blue-500",
  active: "text-emerald-500",
  pending: "text-amber-500",
};

interface EmployerAttendancePanelProps {
  rows: EmployerAttendanceRow[];
  fullReportHref?: string;
}

export function EmployerAttendancePanel({
  rows,
  fullReportHref = "/employer/punch-reports",
}: EmployerAttendancePanelProps) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
          <h2 className="text-[14px] font-bold text-primary-txt">
            Today&apos;s Attendance
          </h2>
        </div>
        <Link
          href={fullReportHref}
          className="text-[12px] font-semibold text-btn-secondary-txt hover:underline flex items-center gap-1"
        >
          Full report →
        </Link>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {rows.map((row) => {
          const isActive = row.status === "active";
          const hoursColor = STATUS_COLORS[row.status] ?? "text-primary-txt";

          return (
            <div
              key={row.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
                style={{ backgroundColor: row.avatarColor }}
              >
                {row.initials}
              </div>

              {/* Name + location */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-primary-txt leading-tight truncate">
                  {row.employeeName}
                </p>
                <p className="text-[11px] text-secondary-txt leading-tight truncate mt-0.5">
                  {row.location}
                </p>
              </div>

              {/* Times + hours */}
              <div className="text-right shrink-0">
                <p className="text-[12px] font-medium text-primary-txt leading-tight">
                  {row.clockIn}
                  {" — "}
                  {isActive ? (
                    <span className="text-emerald-600 font-semibold">—</span>
                  ) : (
                    row.clockOut
                  )}
                </p>
                {isActive ? (
                  <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">
                    Active
                  </p>
                ) : (
                  <p className={cn("text-[11px] font-semibold mt-0.5", hoursColor)}>
                    {row.hours != null ? `${row.hours} hrs` : "—"}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <StatusBadge status={row.status} className="shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}