import { Suspense } from "react";
import { AttendanceView, fetchAttendancePageData } from "@/features/attendance";
import type { AttendanceFilter } from "@/features/attendance";

interface AttendancePageProps {
  searchParams: Promise<{ filter?: string; record?: string }>;
}

async function AttendanceContent({ searchParams }: AttendancePageProps) {
  const sp = await searchParams;
  const activeFilter = (sp?.filter ?? "all") as AttendanceFilter;
  const selectedId = sp?.record ?? null;

  const data = await fetchAttendancePageData();

  return (
    <AttendanceView
      data={data}
      activeFilter={activeFilter}
      selectedId={selectedId}
    />
  );
}

export default function AttendancePage(props: AttendancePageProps) {
  return (
    <Suspense fallback={<AttendanceSkeleton />}>
      <AttendanceContent {...props} />
    </Suspense>
  );
}

function AttendanceSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-5 animate-pulse">
      <div className="h-8 w-64 bg-slate-200 rounded-lg" />
      <div className="h-4 w-80 bg-slate-200/70 rounded-md" />
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => <div key={i} className="h-20 rounded-2xl bg-slate-200/60" />)}
      </div>
      <div className="h-12 w-96 rounded-xl bg-slate-200/60" />
      <div className="grid grid-cols-[3fr_2fr] gap-5">
        <div className="h-96 rounded-2xl bg-slate-200/60" />
        <div className="h-96 rounded-2xl bg-slate-200/60" />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Punch Card & Attendance",
};