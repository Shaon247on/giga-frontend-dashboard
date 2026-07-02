"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column } from "@/components/shared/data-table";
import type { AttendanceRecord } from "../types";

interface AttendanceTableProps {
  data: AttendanceRecord[];
  totalItems: number;
  currentPage: number;
}

export function AttendanceTable({ data, totalItems, currentPage }: AttendanceTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const columns: Column<AttendanceRecord>[] = [
    {
      key: "employeeName",
      header: "Employee",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: item.avatarColor }}
          >
            <span className="text-[11px] font-bold text-white">{item.initials}</span>
          </div>
          <span className="font-medium text-primary-txt">{item.employeeName}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (item) => <span className="text-primary-txt">{item.date}</span>,
    },
    {
      key: "location",
      header: "Location",
      cell: (item) => <span className="text-primary-txt">{item.location}</span>,
    },
    {
      key: "clockIn",
      header: "In",
      cell: (item) => <span className="text-primary-txt">{item.clockIn}</span>,
    },
    {
      key: "clockOut",
      header: "Out",
      cell: (item) => (
        item.clockOut ? (
          <span className="text-primary-txt">{item.clockOut}</span>
        ) : (
          <span className="text-emerald-600 font-semibold">Active</span>
        )
      ),
    },
    {
      key: "hours",
      header: "Hours",
      cell: (item) => (
        item.hours > 0 ? (
          <span className="text-primary-txt">{item.hours.toFixed(2)}</span>
        ) : (
          <span className="text-secondary-txt">—</span>
        )
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      keyExtractor={(item) => item.id}
      totalItems={totalItems}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showPagination={true}
      showRecordCount={true}
      emptyMessage="No attendance records found"
    />
  );
}