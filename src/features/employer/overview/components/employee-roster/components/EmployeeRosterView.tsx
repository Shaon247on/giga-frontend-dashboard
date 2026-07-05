"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Car, Clock } from "lucide-react";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { GlobalPagination } from "@/components/shared/pagination";
import type { SelectOption } from "@/components/shared/filter";
import type { RosterPageData } from "../types";
import { cn } from "@/lib/utils";

interface EmployeeRosterViewProps {
  data: RosterPageData;
  currentPage: number;
}

const ROLE_COLOR: Record<string, string> = {
  Employee: "text-primary-txt",
  Supervisor: "text-violet-600",
  Admin: "text-blue-600",
  Accounting: "text-emerald-600",
};

const ROLE_LABELS: Record<string, string> = {
  Employee: "Field Employees",
  Supervisor: "Supervisors",
  Admin: "Admin/Office",
  Accounting: "Accounting",
};

const PAGE_SIZE = 10;

export function EmployeeRosterView({ data, currentPage }: EmployeeRosterViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const roleFilter = searchParams.get("role") || "all";

  const roleOptions: SelectOption[] = [
    { value: "employee", label: "Employees" },
    { value: "supervisor", label: "Supervisors" },
    { value: "admin", label: "Admin/Office" },
    { value: "accounting", label: "Accounting" },
  ];

  const filteredEmployees = data.employees.filter((employee) => {
    if (roleFilter !== "all" && employee.role.toLowerCase() !== roleFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Paginate data
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedEmployees = filteredEmployees.slice(start, end);

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
          Employee Roster
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          {data.totalCount} total team members
        </p>
      </div>

      {/* Role Count Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(data.roleCounts).map(([role, count]) => (
          <div
            key={role}
            className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 text-center"
          >
            <p className="text-2xl font-bold text-primary-txt">{count}</p>
            <p className="text-[11px] text-secondary-txt uppercase tracking-wide">
              {ROLE_LABELS[role] || role}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <GlobalSearch
          name="search"
          placeholder="Search by name or email..."
          className="flex-1 max-w-sm"
          debounceMs={300}
        />
        <GlobalFilter
          name="role"
          placeholder="All"
          options={roleOptions}
          className="w-45"
          defaultValue="all"
        />
      </div>

      {/* Roster List */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <p className="text-[13px] font-semibold text-primary-txt">
            {filteredEmployees.length} members
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {paginatedEmployees.map((emp) => (
            <div key={emp.id} className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
                  style={{ backgroundColor: emp.avatarColor }}
                >
                  {emp.initials}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <p className="text-[15px] font-semibold text-primary-txt">
                      {emp.name}
                    </p>
                    <span
                      className={cn(
                        "text-[11px] font-semibold",
                        ROLE_COLOR[emp.role] || "text-secondary-txt"
                      )}
                    >
                      {emp.role}
                    </span>
                    {emp.isActive && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    )}
                  </div>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-1.5 text-[12px] text-secondary-txt">
                      <Mail className="w-3.5 h-3.5" strokeWidth={1.8} />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-secondary-txt">
                      <Car className="w-3.5 h-3.5" strokeWidth={1.8} />
                      <span className="truncate">
                        {emp.vehicle || "No vehicle assigned"}
                      </span>
                    </div>
                    {emp.todayPunch && (
                      <div className="flex items-center gap-1.5 text-[12px] text-secondary-txt sm:col-span-2">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
                        <span>Today: {emp.todayPunch}</span>
                      </div>
                    )}
                    {!emp.todayPunch && (
                      <div className="flex items-center gap-1.5 text-[12px] text-secondary-txt/50 sm:col-span-2">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
                        <span>No punch today</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="px-5 py-8 text-center text-secondary-txt">
              No employees found
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredEmployees.length > PAGE_SIZE && (
          <div className="border-t border-slate-100 px-4">
            <GlobalPagination
              total={filteredEmployees.length}
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