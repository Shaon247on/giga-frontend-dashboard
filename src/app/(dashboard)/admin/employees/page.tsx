import { Suspense } from "react";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import {
  EmployeesTable,
  EmployeesTableSkeleton,
  AddEmployeeDialog,
  fetchEmployeesPageData,
} from "@/features/admin/employees";
import type { SelectOption } from "@/components/shared/filter";

interface EmployeesPageProps {
  searchParams: Promise<{ search?: string; role?: string; page?: string }>;
}

async function EmployeesContent({ searchParams }: EmployeesPageProps) {
  const sp = await searchParams;
  const search = sp?.search || "";
  const role = sp?.role || "all";
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchEmployeesPageData();

  // Role filter options
  const roleOptions: SelectOption[] = [
    { value: "employee", label: "Employee" },
    { value: "supervisor", label: "Supervisor" },
    { value: "admin", label: "Admin" },
  ];

  // Filter employees based on search and role
  const filteredEmployees = data.employees.filter((employee) => {
    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Apply role filter
    if (role !== "all" && employee.role.toLowerCase() !== role.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Paginate data
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = filteredEmployees.slice(start, end);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-txt leading-tight">
            Employee Management
          </h1>
          <p className="text-sm text-secondary-txt mt-1">
            Manage employees, assign roles, and oversee profiles
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <GlobalSearch
            name="search"
            placeholder="Search employees..."
            className="flex-1 max-w-sm"
            debounceMs={300}
          />
          <GlobalFilter
            name="role"
            placeholder="All Roles"
            options={roleOptions}
            className="w-45"
            defaultValue="all"
          />
        </div>
        <AddEmployeeDialog />
      </div>

      {/* Table with Suspense */}
      <Suspense fallback={<EmployeesTableSkeleton />}>
        <EmployeesTable
          employees={paginatedData}
          totalItems={filteredEmployees.length}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}

export default function EmployeesPage(props: EmployeesPageProps) {
  return <EmployeesContent {...props} />;
}

export const metadata = {
  title: "Employee Management",
};
