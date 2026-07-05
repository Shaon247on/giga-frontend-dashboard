"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Users, DollarSign, Wrench } from "lucide-react";
import { GlobalSearch } from "@/components/shared/search";
import { GlobalFilter } from "@/components/shared/filter";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable } from "@/components/shared/data-table";
import type { Column } from "@/components/shared/data-table";
import type { SelectOption } from "@/components/shared/filter";
import { FuelCostChart } from "./FuelCostChart";
import type { VehicleReportItem, VehicleReportsPageData } from "../types";
import { cn } from "@/lib/utils";

interface VehicleReportsViewProps {
  data: VehicleReportsPageData;
  currentPage: number;
}

const PAGE_SIZE = 5;

export function VehicleReportsView({
  data,
  currentPage,
}: VehicleReportsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";

  const statusOptions: SelectOption[] = [
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const filteredVehicles = data.vehicles.filter((vehicle) => {
    if (statusFilter !== "all" && vehicle.maintenanceStatus !== statusFilter)
      return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        vehicle.vehicleLabel.toLowerCase().includes(search) ||
        vehicle.makeModel.toLowerCase().includes(search) ||
        vehicle.assignedTo.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Paginate data
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedVehicles = filteredVehicles.slice(start, end);

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
      id: "total-vehicles",
      value: data.summary.totalVehicles.toString(),
      label: "Total Vehicles",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "total-fuel",
      value: `$${data.summary.totalFuelCost.toFixed(2)}`,
      label: "Total Fuel Cost",
      icon: DollarSign,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      id: "open-maintenance",
      value: data.summary.openMaintenance.toString(),
      label: "Open Maintenance",
      icon: Wrench,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  // Table columns
  const columns: Column<VehicleReportItem>[] = [
    {
      key: "vehicleLabel",
      header: "Vehicle",
      cell: (item) => (
        <span className="font-medium text-primary-txt">
          {item.vehicleLabel}
        </span>
      ),
    },
    {
      key: "makeModel",
      header: "Make / Model",
      cell: (item) => (
        <span className="text-primary-txt">{item.makeModel}</span>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ backgroundColor: item.avatarColor }}
          >
            {item.initials}
          </div>
          <span className="text-primary-txt">{item.assignedTo}</span>
        </div>
      ),
    },
    {
      key: "mileage",
      header: "Mileage",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.mileage.toLocaleString()} km
        </span>
      ),
    },
    {
      key: "fuelCost",
      header: "Fuel Cost",
      cell: (item) => (
        <span className="text-primary-txt font-medium">
          ${item.fuelCost.toFixed(2)}
        </span>
      ),
    },
    {
      key: "liters",
      header: "Liters",
      cell: (item) => (
        <span className="text-primary-txt">{item.liters.toFixed(1)} L</span>
      ),
    },
    {
      key: "maintenanceStatus",
      header: "Maintenance",
      cell: (item) => <StatusBadge status={item.maintenanceStatus} />,
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-txt leading-tight">
            Vehicle Reports
          </h1>
          <p className="text-sm text-secondary-txt mt-1">
            Fleet performance, fuel costs, and repair status
          </p>
        </div>
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
      <FuelCostChart data={data.fuelData} />

      {/* Search and Vehicles Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-start">
          <GlobalSearch
            name="search"
            placeholder="Search vehicle, model, or employee..."
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

        <DataTable
          data={paginatedVehicles}
          columns={columns}
          keyExtractor={(item) => item.id}
          totalItems={filteredVehicles.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showPagination={filteredVehicles.length > PAGE_SIZE}
          showRecordCount={true}
          emptyMessage="No vehicles found"
        />
      </div>
    </div>
  );
}
