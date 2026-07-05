"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Clock, Users, AlertTriangle } from "lucide-react";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import type { SelectOption } from "@/components/shared/filter";
import { ShopHoursChart } from "./ShopHoursChart";
import type { PunchReportsPageData, PunchRecord } from "../types";
import { cn } from "@/lib/utils";

interface PunchReportsViewProps {
  data: PunchReportsPageData;
  currentPage: number;
}

const PAGE_SIZE = 5;

export function PunchReportsView({ data, currentPage }: PunchReportsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const typeFilter = searchParams.get("type") || "all";
  const statusFilter = searchParams.get("status") || "all";

  const typeOptions: SelectOption[] = [
    { value: "shop", label: "Shop" },
    { value: "out-of-town", label: "Out-Of-Town" },
    { value: "manual", label: "Manual" },
  ];

  const statusOptions: SelectOption[] = [
    { value: "active", label: "Active" },
    { value: "reviewed", label: "Reviewed" },
    { value: "pending", label: "Pending" },
  ];

  const filteredRecords = data.records.filter((record) => {
    if (typeFilter !== "all" && record.type.toLowerCase() !== typeFilter)
      return false;
    if (statusFilter !== "all" && record.status !== statusFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        record.employeeName.toLowerCase().includes(search) ||
        record.location.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Paginate data
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedRecords = filteredRecords.slice(start, end);

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

  // Summary cards
  const summaryCards = [
    {
      id: "total-hours",
      value: `${data.summary.totalHours.toFixed(1)} hrs`,
      label: "Total Hours",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "active-now",
      value: data.summary.activeNow.toString(),
      label: "Active Right Now",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: "pending-review",
      value: data.summary.pendingReview.toString(),
      label: "Pending Review",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  // Table columns
  const columns: Column<PunchRecord>[] = [
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
          <span className="font-medium text-primary-txt">
            {item.employeeName}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (item) => <span className="text-primary-txt">{item.date}</span>,
    },
    {
      key: "location",
      header: "Location",
      cell: (item) => <span className="text-primary-txt">{item.location}</span>,
    },
    {
      key: "clockIn",
      header: "In",
      cell: (item) => <span className="text-primary-txt">{item.clockIn}</span>,
    },
    {
      key: "clockOut",
      header: "Out",
      cell: (item) =>
        item.clockOut ? (
          <span className="text-primary-txt">{item.clockOut}</span>
        ) : (
          <span className="text-emerald-600 font-semibold">Active</span>
        ),
    },
    {
      key: "hours",
      header: "Hours",
      cell: (item) =>
        item.hours !== null ? (
          <span className="text-primary-txt">{item.hours.toFixed(1)} hrs</span>
        ) : (
          <span className="text-secondary-txt">—</span>
        ),
    },
    {
      key: "type",
      header: "Type",
      cell: (item) => (
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
            item.type === "Shop" && "bg-blue-50 text-blue-600",
            item.type === "Out-Of-Town" && "bg-purple-50 text-purple-600",
            item.type === "Manual" && "bg-amber-50 text-amber-600",
          )}
        >
          {item.type}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Punch & Time Off Reports
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Attendance, hours, and leave overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm px-5 py-4"
            >
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                  card.bg,
                )}
              >
                <Icon className={cn("w-5 h-5", card.color)} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-txt leading-tight">
                  {card.value}
                </p>
                <p className="text-[12px] text-secondary-txt leading-tight mt-0.5">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <ShopHoursChart data={data.shopHours} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search by employee or location..."
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
      <DataTable
        data={paginatedRecords}
        columns={columns}
        keyExtractor={(item) => item.id}
        totalItems={filteredRecords.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        showPagination={filteredRecords.length > PAGE_SIZE}
        showRecordCount={true}
        emptyMessage="No punch records found"
      />
    </div>
  );
}
