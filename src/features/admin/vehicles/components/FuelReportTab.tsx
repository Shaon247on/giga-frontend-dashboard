"use client";

import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import type { FuelReport } from "../types";

interface FuelReportTabProps {
  data: FuelReport[];
}

export function FuelReportTab({ data }: FuelReportTabProps) {
  const columns: Column<FuelReport>[] = [
    {
      key: "employee",
      header: "Employee",
      cell: (item) => (
        <span className="font-medium text-primary-txt">{item.employee}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (item) => (
        <span className="text-primary-txt">{item.date}</span>
      ),
    },
    {
      key: "mileage",
      header: "Mileage",
      cell: (item) => (
        <span className="text-primary-txt">{item.mileage.toLocaleString()} km</span>
      ),
    },
    {
      key: "liters",
      header: "Liters",
      cell: (item) => (
        <span className="text-primary-txt">{item.liters.toFixed(1)} L</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (item) => (
        <span className="text-primary-txt font-medium">${item.amount.toFixed(2)}</span>
      ),
    },
    {
      key: "lPer100km",
      header: "L/100km",
      cell: (item) => (
        <span className="text-primary-txt">{item.lPer100km.toFixed(1)}</span>
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
      emptyMessage="No fuel reports found"
      className="border-0 shadow-none"
    />
  );
}