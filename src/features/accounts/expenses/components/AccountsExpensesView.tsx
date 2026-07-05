"use client";

import { useSearchParams } from "next/navigation";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { AccountsExpensesTable } from "./AccountsExpensesTable";
import type { AccountExpense } from "../types";
import type { SelectOption } from "@/components/shared/filter";

interface AccountsExpensesViewProps {
  expenses: AccountExpense[];
  currentPage: number;
}

export function AccountsExpensesView({
  expenses,
  currentPage,
}: AccountsExpensesViewProps) {
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";
  const typeFilter = searchParams.get("type") || "all";
  const searchTerm = searchParams.get("search") || "";

  // Filter options
  const statusOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
    { value: "paid", label: "Paid" },
  ];

  const typeOptions: SelectOption[] = [
    { value: "direct", label: "Direct" },
    { value: "shop", label: "Shop" },
  ];

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    // Apply status filter
    if (statusFilter !== "all" && expense.status !== statusFilter) return false;

    // Apply type filter
    if (typeFilter !== "all" && expense.type !== typeFilter) return false;

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return expense.employeeName.toLowerCase().includes(search);
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search employee..."
          className="flex-1 max-w-sm"
          debounceMs={300}
        />
        <GlobalFilter
          name="status"
          placeholder="All Status"
          options={statusOptions}
          className="w-45"
          defaultValue="all"
        />
        <GlobalFilter
          name="type"
          placeholder="All Types"
          options={typeOptions}
          className="w-45"
          defaultValue="all"
        />
      </div>

      {/* Table */}
      <AccountsExpensesTable
        data={filteredExpenses}
        totalItems={filteredExpenses.length}
        currentPage={currentPage}
      />
    </div>
  );
}
