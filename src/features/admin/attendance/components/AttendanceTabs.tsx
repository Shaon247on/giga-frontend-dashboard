"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { AttendanceTable } from "./AttendanceTable";
import { TimeOffTable } from "./TimeOffTable";
import type { AttendanceRecord, TimeOffRequest } from "../types";
import type { SelectOption } from "@/components/shared/filter";

interface AttendanceTabsProps {
  attendanceRecords: AttendanceRecord[];
  timeOffRequests: TimeOffRequest[];
  currentPage: number;
}

export function AttendanceTabs({
  attendanceRecords,
  timeOffRequests,
  currentPage,
}: AttendanceTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || "attendance";
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "attendance") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    params.delete("page");
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  // Attendance filter options
  const attendanceFilterOptions: SelectOption[] = [
    { value: "pending", label: "Pending Review" },
    { value: "reviewed", label: "Reviewed" },
    { value: "active", label: "Active" },
  ];

  // Time off filter options
  const timeOffFilterOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const attendanceStatus = searchParams.get("status") || "all";
  const timeOffStatus = searchParams.get("timeoff-status") || "all";
  const attendanceSearch = searchParams.get("attendance-search") || "";
  const timeOffSearch = searchParams.get("timeoff-search") || "";

  // Filter attendance records
  const filteredAttendance = attendanceRecords.filter((record) => {
    if (attendanceStatus !== "all" && record.status !== attendanceStatus) return false;
    if (attendanceSearch) {
      const search = attendanceSearch.toLowerCase();
      return record.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  // Filter time off requests
  const filteredTimeOff = timeOffRequests.filter((request) => {
    if (timeOffStatus !== "all" && request.status !== timeOffStatus) return false;
    if (timeOffSearch) {
      const search = timeOffSearch.toLowerCase();
      return request.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1 h-auto gap-1 w-full overflow-x-auto">
        <TabsTrigger
          value="attendance"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Attendance
        </TabsTrigger>
        <TabsTrigger
          value="timeoff"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Time Off
        </TabsTrigger>
      </TabsList>

      <TabsContent value="attendance" className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <GlobalSearch
            name="attendance-search"
            placeholder="Search employee..."
            className="flex-1 max-w-sm"
            debounceMs={300}
          />
          <GlobalFilter
            name="status"
            placeholder="All Records"
            options={attendanceFilterOptions}
            className="w-45"
            defaultValue="all"
          />
        </div>
        <AttendanceTable
          data={filteredAttendance}
          totalItems={filteredAttendance.length}
          currentPage={currentPage}
        />
      </TabsContent>

      <TabsContent value="timeoff" className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <GlobalSearch
            name="timeoff-search"
            placeholder="Search employee..."
            className="flex-1 max-w-sm"
            debounceMs={300}
          />
          <GlobalFilter
            name="timeoff-status"
            placeholder="All Requests"
            options={timeOffFilterOptions}
            className="w-45"
            defaultValue="all"
          />
        </div>
        <TimeOffTable
          data={filteredTimeOff}
          totalItems={filteredTimeOff.length}
          currentPage={currentPage}
        />
      </TabsContent>
    </Tabs>
  );
}