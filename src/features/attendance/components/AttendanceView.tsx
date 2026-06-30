import { Suspense } from "react";
import { AttendanceStatCards } from "./AttendanceStatCards";
import { AttendanceFilterTabs } from "./AttendanceFilterTabs";
import { AttendanceTable } from "./AttendanceTable";
import { AttendanceDetailPanel } from "./AttendanceDetailPanel";
import type { AttendancePageData, AttendanceFilter } from "../types";

interface AttendanceViewProps {
  data: AttendancePageData;
  activeFilter: AttendanceFilter;
  selectedId: string | null;
}

export function AttendanceView({ data, activeFilter, selectedId }: AttendanceViewProps) {
  const filteredRecords = data.records.filter((record) => {
    switch (activeFilter) {
      case "pending-review": return record.status === "pending";
      case "manual-entry":   return record.type === "manual";
      case "out-of-town":    return record.type === "out-of-town";
      default:               return true;
    }
  });

  return (
    <div className="p-6 lg:p-8 space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172B] leading-tight">
          Punch Card &amp; Attendance
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          Monitor and verify employee clock-in/out activity
        </p>
      </div>

      {/* Stat cards */}
      <AttendanceStatCards cards={data.statCards} />

      {/* Filter tabs — needs Suspense because it calls useSearchParams */}
      <Suspense>
        <AttendanceFilterTabs tabs={data.filterTabs} activeFilter={activeFilter} />
      </Suspense>

      {/* Table + Detail — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 items-start">
        {/* Table: also needs Suspense (useSearchParams inside) */}
        <Suspense>
          <AttendanceTable records={filteredRecords} selectedId={selectedId} />
        </Suspense>

        {/* Detail panel: fully self-contained client component.
            Reads ?record= from URL itself — zero props needed.
            Swaps content without any parent re-render. */}
        <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm min-h-[400px] overflow-hidden">
          <Suspense>
            <AttendanceDetailPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}