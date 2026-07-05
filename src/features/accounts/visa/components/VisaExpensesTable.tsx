"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Eye } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column, Action } from "@/components/shared/data-table";
import type { VisaExpense } from "../types";
import { cn } from "@/lib/utils";

interface VisaExpensesTableProps {
  data: VisaExpense[];
  totalItems: number;
  currentPage: number;
}

export function VisaExpensesTable({
  data,
  totalItems,
  currentPage,
}: VisaExpensesTableProps) {
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

  const handleView = (item: VisaExpense) => {
    router.push(`/accounts/visa/${item.id}`, { scroll: false });
  };

  const columns: Column<VisaExpense>[] = [
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
      key: "amount",
      header: "Amount",
      cell: (item) => (
        <div>
          <span className="font-medium text-primary-txt">${item.amount.toFixed(2)}</span>
          <span className="text-secondary-txt text-[11px] block">+${item.tax.toFixed(2)} tax</span>
        </div>
      ),
    },
    {
      key: "poJob",
      header: "PO / Job",
      cell: (item) => (
        <div>
          <span className="text-primary-txt text-[13px]">{item.poNumber}</span>
          <span className="text-secondary-txt text-[11px] block">{item.jobNumber}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "paidDate",
      header: "Paid Date",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.paidDate || "—"}
        </span>
      ),
    },
  ];

  const actions: Action<VisaExpense>[] = [
    {
      label: "View",
      icon: <Eye className="w-3.5 h-3.5" />,
      onClick: (item) => handleView(item),
      variant: "outline",
      size: "sm",
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      keyExtractor={(item) => item.id}
      totalItems={totalItems}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showPagination={true}
      showRecordCount={true}
      emptyMessage="No Visa expenses found"
    />
  );
}