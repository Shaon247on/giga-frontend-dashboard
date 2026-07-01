import Link from "next/link";
import { TrendingUp, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ROUTES } from "@/constants/routes";
import type { AttendanceRow } from "../types";

interface TodaysAttendancePanelProps {
  rows: AttendanceRow[];
}

export function TodaysAttendancePanel({ rows }: TodaysAttendancePanelProps) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-card border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#135CC8]" strokeWidth={2} />
          <h2 className="text-[14px] font-semibold text-[#0F172B]">
            Today&apos;s Attendance
          </h2>
        </div>
        <Link
          href={ROUTES.attendance}
          className="text-[12px] font-medium text-[#155DFC] hover:underline flex items-center gap-1 transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-120" aria-label="Today's attendance">
          {/* Column headers */}
          <thead>
            <tr className="bg-[#F8FAFC99]">
              {["Employee", "Location", "In / Out", "Status"].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-[11px] font-semibold text-[#90A1B9] tracking-wide uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/50">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-100/40 transition-colors duration-150"
              >
                {/* Employee */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: row.avatarColor }}
                    >
                      <span className="text-[10px] font-bold text-white tracking-wide">
                        {row.initials}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold text-[#0F172B] leading-tight">
                      {row.employeeName}
                    </span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-5 py-3.5">
                  <span className="text-[13px] text-[#667085] leading-tight">
                    {row.location}
                  </span>
                </td>

                {/* In / Out times */}
                <td className="px-5 py-3.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-medium text-[#0F172B]">
                      {row.clockIn}
                    </span>
                    {row.clockOut ? (
                      <span className="text-[12px] text-[#667085]">{row.clockOut}</span>
                    ) : (
                      <span className="flex items-center gap-1 text-[12px] text-emerald-600 font-medium">
                        <CheckCircle className="w-3 h-3" strokeWidth={2} />
                        Active
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}