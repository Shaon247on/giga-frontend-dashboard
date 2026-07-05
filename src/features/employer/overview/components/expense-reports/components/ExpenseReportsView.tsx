"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { GlobalPagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { SelectOption } from "@/components/shared/filter";
import type { ExpenseReportsPageData } from "../types";
import { cn } from "@/lib/utils";

interface ExpenseReportsViewProps {
  data: ExpenseReportsPageData;
  currentPage: number;
}

const PAGE_SIZE = 4;

export function ExpenseReportsView({ data, currentPage }: ExpenseReportsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const typeFilter = searchParams.get("type") || "all";

  const statusOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "reviewed", label: "Reviewed" },
    { value: "paid", label: "Paid" },
  ];

  const typeOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "personal", label: "Personal" },
    { value: "visa", label: "Visa" },
  ];

  const filteredItems = data.items.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (typeFilter !== "all" && item.type.toLowerCase() !== typeFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return item.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  // Paginate data
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedItems = filteredItems.slice(start, end);

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

  // Calculate filtered total
  const filteredTotal = filteredItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Expense Summary
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          {data.totalCount} total submissions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">${data.summary.grandTotal.toFixed(2)}</p>
          <p className="text-[11px] text-secondary-txt uppercase tracking-wide">Grand Total</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary-txt">${data.summary.personalTotal.toFixed(2)}</p>
          <p className="text-[11px] text-secondary-txt uppercase tracking-wide">Personal</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary-txt">${data.summary.visaTotal.toFixed(2)}</p>
          <p className="text-[11px] text-secondary-txt uppercase tracking-wide">Visa / Card</p>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">${data.summary.pendingTotal.toFixed(2)}</p>
          <p className="text-[11px] text-secondary-txt uppercase tracking-wide">Pending</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search by employee name..."
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

      {/* Expenses List */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <p className="text-[13px] font-semibold text-primary-txt">
            {filteredItems.length} submissions
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {paginatedItems.map((item) => (
            <div key={item.id} className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
                  style={{ backgroundColor: item.avatarColor }}
                >
                  {item.initials}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-[15px] font-semibold text-primary-txt">
                      {item.employeeName}
                    </p>
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      getTypeColor(item.type)
                    )}>
                      {item.type}
                    </span>
                    <span className="text-[12px] text-secondary-txt">
                      {item.date}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-4 mt-1">
                    <span className="text-[13px] font-medium text-primary-txt">
                      ${item.amount.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-secondary-txt">
                      PO: {item.poNumber}
                    </span>
                    <span className="text-[11px] text-secondary-txt">
                      Job: {item.jobNumber} ({item.jobType})
                    </span>
                    <span className="text-[11px] text-secondary-txt">
                      Tax: ${item.tax.toFixed(2)}
                    </span>
                  </div>
                </div>
                <StatusBadge status={item.status} className="shrink-0" />
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-5 py-8 text-center text-secondary-txt">
              No expenses found
            </div>
          )}
        </div>

        {/* Footer Total */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[13px] font-semibold text-primary-txt text-right">
            Total: ${filteredTotal.toFixed(2)}
          </p>
        </div>

        {/* Pagination */}
        {filteredItems.length > PAGE_SIZE && (
          <div className="border-t border-slate-100 px-4">
            <GlobalPagination
              total={filteredItems.length}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}