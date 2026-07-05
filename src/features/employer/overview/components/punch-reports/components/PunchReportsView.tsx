"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { GlobalPagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { SelectOption } from "@/components/shared/filter";
import type { PunchReportsPageData } from "../types";

interface PunchReportsViewProps {
  data: PunchReportsPageData;
  currentPage: number;
}

const PAGE_SIZE = 4;

export function PunchReportsView({ data, currentPage }: PunchReportsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";

  const statusOptions: SelectOption[] = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "reviewed", label: "Reviewed" },
    { value: "denied", label: "Denied" },
  ];

  const filteredRequests = data.requests.filter((request) => {
    if (statusFilter !== "all" && request.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return request.employeeName.toLowerCase().includes(search);
    }
    return true;
  });

  // Paginate data
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedRequests = filteredRequests.slice(start, end);

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
          Time Off Requests
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
              {status}
            </p>
          </div>
        ))}
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
            {filteredRequests.length} requests
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {paginatedRequests.map((request) => (
            <div key={request.id} className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
                  style={{ backgroundColor: request.avatarColor }}
                >
                  {request.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-[15px] font-semibold text-primary-txt">
                      {request.employeeName}
                    </p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="text-[13px] text-secondary-txt mt-0.5">
                    {request.type} • {request.dateRange}
                  </p>
                  {request.reason && (
                    <p className="text-[12px] text-secondary-txt/70 mt-1">
                      {request.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredRequests.length === 0 && (
            <div className="px-5 py-8 text-center text-secondary-txt">
              No time off requests found
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredRequests.length > PAGE_SIZE && (
          <div className="border-t border-slate-100 px-4">
            <GlobalPagination
              total={filteredRequests.length}
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