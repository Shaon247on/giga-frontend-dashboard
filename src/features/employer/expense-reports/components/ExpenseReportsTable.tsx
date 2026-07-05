"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column } from "@/components/shared/data-table";
import type { ExpenseReportItem } from "../types";
import { cn } from "@/lib/utils";

interface ExpenseReportsTableProps {
  data: ExpenseReportItem[];
  totalItems: number;
  currentPage: number;
}

export function ExpenseReportsTable({
  data,
  totalItems,
  currentPage,
}: ExpenseReportsTableProps) {
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

  const getTypeColor = (type: string) => {
    return type === "Personal" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600";
  };

  const columns: Column<ExpenseReportItem>[] = [
    {
      key: "employeeName",
      header: "Employee",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
            style={{ backgroundColor: item.avatarColor }}
          >
            {item.initials}
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
      key: "type",
      header: "Type",
      cell: (item) => (
        <span className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
          getTypeColor(item.type)
        )}>
          {item.type}
        </span>
      ),
    },
    {
      key: "poJob",
      header: "PO / Job",
      cell: (item) => (
        <div>
          <span className="text-primary-txt text-[13px]">{item.poNumber}</span>
          <span className="text-secondary-txt text-[11px] block">- {item.jobNumber}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (item) => (
        <span className="font-medium text-primary-txt">${item.amount.toFixed(2)}</span>
      ),
    },
    {
      key: "tax",
      header: "Tax",
      cell: (item) => (
        <span className="text-primary-txt">${item.tax.toFixed(2)}</span>
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
      emptyMessage="No expense records found"
    />
  );
}