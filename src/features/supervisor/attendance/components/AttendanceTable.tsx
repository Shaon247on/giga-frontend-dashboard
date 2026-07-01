"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AttendanceRecord } from "../types";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  selectedId: string | null;
}

export function AttendanceTable({ records, selectedId }: AttendanceTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRowClick = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // Toggle: clicking the same row deselects it
      if (id === selectedId) {
        params.delete("record");
      } else {
        params.set("record", id);
      }
      router.replace(`/dashboard/attendance?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, selectedId]
  );

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Record count */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <p className="text-[13px] font-semibold text-[#0F172B]">
          {records.length} record{records.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_100px_100px_120px_32px] px-5 py-2.5 bg-[#F8FAFC99] border-b border-slate-100">
        {["Employee", "Date", "In / Out", "Status", ""].map((col, i) => (
          <span key={i} className="text-[11px] font-semibold text-[#90A1B9] uppercase tracking-wide">
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {records.map((record) => {
          const isSelected = record.id === selectedId;

          return (
            <button
              key={record.id}
              onClick={() => handleRowClick(record.id)}
              className={cn(
                "w-full grid grid-cols-[1fr_100px_100px_120px_32px] items-center px-5 py-3.5",
                "transition-colors duration-150 cursor-pointer text-left",
                "border-l-2",
                isSelected
                  ? "bg-blue-50/60 border-l-[#135CC8]"
                  : "hover:bg-slate-50/80 border-l-transparent"
              )}
              aria-pressed={isSelected}
            >
              {/* Employee */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: record.avatarColor }}
                >
                  <span className="text-[11px] font-bold text-white">{record.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172B] leading-tight truncate">
                    {record.employeeName}
                  </p>
                  <p className="text-[11px] text-[#667085] leading-tight truncate mt-0.5">
                    {record.location}
                  </p>
                </div>
              </div>

              {/* Date */}
              <span className="text-[12px] text-[#667085]">{record.date}</span>

              {/* In / Out */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-medium text-[#0F172B]">{record.clockIn}</span>
                {record.clockOut ? (
                  <span className="text-[11px] text-[#667085]">{record.clockOut}</span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-600">Active</span>
                )}
              </div>

              {/* Status */}
              <StatusBadge status={record.status} />

              {/* Chevron */}
              <ChevronRight
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  isSelected ? "text-[#135CC8]" : "text-slate-300"
                )}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}