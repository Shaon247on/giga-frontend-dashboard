import { Suspense } from "react";
import {
  AttendanceTabs,
  AttendancePageSkeleton,
  fetchAttendancePageData,
} from "@/features/admin/attendance";

interface AttendancePageProps {
  searchParams: Promise<{
    tab?: string;
    status?: string;
    "timeoff-status"?: string;
    "attendance-search"?: string;
    "timeoff-search"?: string;
    page?: string;
  }>;
}

async function AttendanceContent({ searchParams }: AttendancePageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchAttendancePageData();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Punch Card & Time Off
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Monitor attendance and manage time off requests
        </p>
      </div>

      {/* Tabs with Tables */}
      <AttendanceTabs
        attendanceRecords={data.attendanceRecords}
        timeOffRequests={data.timeOffRequests}
        currentPage={page}
      />
    </div>
  );
}

export default function AttendancePage(props: AttendancePageProps) {
  return (
    <Suspense fallback={<AttendancePageSkeleton />}>
      <AttendanceContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Punch Card & Time Off",
};
