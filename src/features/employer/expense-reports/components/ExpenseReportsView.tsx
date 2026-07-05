"use client";

import { useSearchParams } from "next/navigation";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import type { SelectOption } from "@/components/shared/filter";
import { ExpenseSummaryCards } from "./ExpenseSummaryCards";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { ExpenseReportsTable } from "./ExpenseReportsTable";
import type { ExpenseReportsPageData } from "../types";

interface ExpenseReportsViewProps {
  data: ExpenseReportsPageData;
  currentPage: number;
}

export function ExpenseReportsView({ data, currentPage }: ExpenseReportsViewProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const typeFilter = searchParams.get("type") || "all";
  const statusFilter = searchParams.get("status") || "all";

  // Status options - different for Personal vs Visa
  const statusOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "rejected", label: "Rejected" },
  ];

  const typeOptions: SelectOption[] = [
    { value: "personal", label: "Personal" },
    { value: "visa", label: "Visa" },
  ];

  const filteredItems = data.items.filter((item) => {
    if (typeFilter !== "all" && item.type.toLowerCase() !== typeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        item.employeeName.toLowerCase().includes(search) ||
        item.poNumber.toLowerCase().includes(search)
      );
    }
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Expense Reports
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Personal and Visa expense summaries
        </p>
      </div>

      {/* Summary Cards */}
      <ExpenseSummaryCards
        grandTotal={data.summary.grandTotal}
        personalTotal={data.summary.personalTotal}
        visaTotal={data.summary.visaTotal}
        pendingTotal={data.summary.pendingTotal}
      />

      {/* Breakdown Chart */}
      <ExpenseBreakdownChart
        personalPercentage={data.breakdown.personal.percentage}
        visaPercentage={data.breakdown.visa.percentage}
        personalPaid={data.breakdown.personal.paid}
        visaPaid={data.breakdown.visa.paid}
      />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search by employee or PO..."
          className="flex-1 max-w-sm"
          debounceMs={300}
        />
        <GlobalFilter
          name="type"
          placeholder="All Types"
          options={typeOptions}
          className="w-45"
          defaultValue="all"
        />
        <GlobalFilter
          name="status"
          placeholder="All Status"
          options={statusOptions}
          className="w-45"
          defaultValue="all"
        />
      </div>

      {/* Table */}
      <ExpenseReportsTable
        data={filteredItems}
        totalItems={filteredItems.length}
        currentPage={currentPage}
      />
    </div>
  );
}