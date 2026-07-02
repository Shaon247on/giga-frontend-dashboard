"use client";

import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import type { OilChangeRecord } from "../types";
import { cn } from "@/lib/utils";

interface OilChangeTabProps {
  data: OilChangeRecord[];
}

export function OilChangeTab({ data }: OilChangeTabProps) {
  const columns: Column<OilChangeRecord>[] = [
    {
      key: "currentMileage",
      header: "Current Mileage",
      cell: (item) => (
        <span className="font-medium text-primary-txt">
          {item.currentMileage.toLocaleString()} km
        </span>
      ),
    },
    {
      key: "lastOilChange",
      header: "Last Oil Change",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.lastOilChange.toLocaleString()} km
        </span>
      ),
    },
    {
      key: "remaining",
      header: "Remaining",
      cell: (item) => (
        <span className={cn(
          "font-semibold",
          item.remaining < 1000 ? "text-btn-reject" : "text-emerald-600"
        )}>
          {item.remaining.toLocaleString()} km
        </span>
      ),
    },
    {
      key: "limitKm",
      header: "Service Limit",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.limitKm.toLocaleString()} km
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      keyExtractor={(item) => item.id}
      showPagination={false}
      showRecordCount={true}
      emptyMessage="No oil change records found"
      className="border-0 shadow-none"
    />
  );
}