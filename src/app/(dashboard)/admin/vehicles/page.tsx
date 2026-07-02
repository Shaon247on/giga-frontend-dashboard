import { Suspense } from "react";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import {
  VehiclesTable,
  VehiclesPageSkeleton,
  fetchVehiclesPageData,
  AddVehicleDialog,
} from "@/features/admin/vehicles";
import type { SelectOption } from "@/components/shared/filter";

interface VehiclesPageProps {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

async function VehiclesContent({ searchParams }: VehiclesPageProps) {
  const sp = await searchParams;
  const search = sp?.search || "";
  const status = sp?.status || "all";
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchVehiclesPageData();

  // Status filter options
  const statusOptions: SelectOption[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "maintenance", label: "In Maintenance" },
  ];

  // Filter vehicles based on search and status
  const filteredVehicles = data.vehicles.filter((vehicle) => {
    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        vehicle.vehicleNumber.toLowerCase().includes(searchLower) ||
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.plateNumber.toLowerCase().includes(searchLower) ||
        vehicle.assignedDriver.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Apply status filter
    if (status !== "all" && vehicle.status !== status) {
      return false;
    }

    return true;
  });

  // Paginate data
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = filteredVehicles.slice(start, end);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-txt leading-tight">
            Vehicle Management
          </h1>
          <p className="text-sm text-secondary-txt mt-1">
            Fleet registry, assignment, and maintenance tracking
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center flex-col md:flex-row gap-4">
          <GlobalSearch
            name="search"
            placeholder="Search vehicles..."
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
        <AddVehicleDialog />
      </div>

      {/* Table with Suspense */}
      <Suspense fallback={<VehiclesPageSkeleton />}>
        <VehiclesTable
          vehicles={paginatedData}
          totalItems={filteredVehicles.length}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}

export default function VehiclesPage(props: VehiclesPageProps) {
  return <VehiclesContent {...props} />;
}

export const metadata = {
  title: "Vehicle Management",
};
