"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { GlobalPagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { SelectOption } from "@/components/shared/filter";
import type { VehicleReportsPageData } from "../types";

interface VehicleReportsViewProps {
  data: VehicleReportsPageData;
  currentPage: number;
}

const PAGE_SIZE = 3;

export function VehicleReportsView({ data, currentPage }: VehicleReportsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";

  const statusOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const filteredItems = data.items.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        item.vehicleLabel.toLowerCase().includes(search) ||
        item.problem.toLowerCase().includes(search) ||
        item.reportedBy.toLowerCase().includes(search)
      );
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

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Vehicle Maintenance
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          {data.totalCount} total requests
        </p>
      </div>

      {/* Status Count Cards */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(data.statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 text-center"
          >
            <p className="text-2xl font-bold text-primary-txt">{count}</p>
            <p className="text-[11px] text-secondary-txt uppercase tracking-wide">
              {status === "in-progress" ? "In Progress" : status}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search vehicle, employee, or problem..."
          className="flex-1 max-w-sm"
          debounceMs={300}
        />
        <GlobalFilter
          name="status"
          placeholder="All"
          options={statusOptions}
          className="w-45"
          defaultValue="all"
        />
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <p className="text-[13px] font-semibold text-primary-txt">
            {filteredItems.length} requests
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {paginatedItems.map((item) => (
            <div key={item.id} className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-[15px] font-semibold text-primary-txt">
                      {item.vehicleLabel}
                    </p>
                    <span className="text-[12px] text-secondary-txt">
                      {item.vehicleDetails}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-primary-txt mt-1">
                    Problem: {item.problem}
                  </p>
                  {item.note && (
                    <p className="text-[12px] text-secondary-txt mt-0.5">
                      Note: {item.note}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[11px] text-secondary-txt">
                      Reported by {item.reportedBy}
                    </span>
                    <span className="text-[11px] text-secondary-txt">
                      {item.date}
                    </span>
                  </div>
                </div>
                <StatusBadge status={item.status} className="shrink-0" />
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-5 py-8 text-center text-secondary-txt">
              No maintenance requests found
            </div>
          )}
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