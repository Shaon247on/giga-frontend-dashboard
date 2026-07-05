"use client";

import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { VisaExpensesTable } from "./VisaExpensesTable";
import { VisaStatCards } from "./VisaStatCards";
import type { VisaExpense } from "../types";
import type { SelectOption } from "@/components/shared/filter";

interface VisaExpensesViewProps {
  expenses: VisaExpense[];
  currentPage: number;
}

export function VisaExpensesView({
  expenses,
  currentPage,
}: VisaExpensesViewProps) {
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";
  const searchTerm = searchParams.get("search") || "";

  // Filter options
  const statusOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "reviewed", label: "Reviewed" },
    { value: "rejected", label: "Rejected" },
  ];

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    // Apply status filter
    if (statusFilter !== "all" && expense.status !== statusFilter) return false;

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return expense.employeeName.toLowerCase().includes(search);
    }

    return true;
  });

  // Calculate stats
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalTax = expenses.reduce((sum, e) => sum + e.tax, 0);
  const totalSubmissions = expenses.length;

  const handleExport = () => {
    console.log("Exporting Visa data...");
    // TODO: Implement export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-txt leading-tight">
            Visa / Company Card
          </h1>
          <p className="text-sm text-secondary-txt mt-1">
            Reconcile company card charges and Visa statements
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stat Cards */}
      <VisaStatCards
        totalAmount={totalAmount}
        totalTax={totalTax}
        totalSubmissions={totalSubmissions}
      />

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
      </div>

      {/* Table */}
      <VisaExpensesTable
        data={filteredExpenses}
        totalItems={filteredExpenses.length}
        currentPage={currentPage}
      />
    </div>
  );
}
