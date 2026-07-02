"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2, Eye, MapPin } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column, Action } from "@/components/shared/data-table";
import type { Vehicle } from "../types";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  totalItems: number;
  currentPage: number;
}

export function VehiclesTable({
  vehicles,
  totalItems,
  currentPage,
}: VehiclesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const handleRowClick = (vehicle: Vehicle) => {
    router.push(`/admin/vehicles/${vehicle.id}`);
  };

  const handleView = (vehicle: Vehicle) => {
    router.push(`/admin/vehicles/${vehicle.id}`);
  };

  const handleEdit = (vehicle: Vehicle) => {
    router.push(`/admin/vehicles/${vehicle.id}/edit`);
  };

  const handleDelete = (vehicle: Vehicle) => {
    console.log("Delete vehicle:", vehicle.id);
    // TODO: Show delete confirmation dialog
  };

//   const getStatusLabel = (status: string) => {
//     const map: Record<string, string> = {
//       active: "Active",
//       inactive: "Inactive",
//       maintenance: "In Maintenance",
//     };
//     return map[status] || status;
//   };

  // Define columns
  const columns: Column<Vehicle>[] = [
    {
      key: "vehicleNumber",
      header: "Vehicle",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-primary-txt">{item.vehicleNumber}</p>
            <p className="text-[11px] text-secondary-txt">{item.make} {item.model}</p>
          </div>
        </div>
      ),
    },
    {
      key: "yearMake",
      header: "Year / Make",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.year} {item.make}
        </span>
      ),
    },
    {
      key: "plateNumber",
      header: "Plate",
      cell: (item) => (
        <span className="font-mono text-primary-txt">{item.plateNumber}</span>
      ),
    },
    {
      key: "currentMileage",
      header: "Mileage",
      cell: (item) => (
        <span className="text-primary-txt">
          {item.currentMileage.toLocaleString()} km
        </span>
      ),
    },
    {
      key: "assignedDriver",
      header: "Assigned To",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: item.driverColor }}
          >
            <span className="text-[9px] font-bold text-white">
              {item.driverInitials}
            </span>
          </div>
          <span className="text-primary-txt">{item.assignedDriver}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
  ];

  // Define actions
  const actions: Action<Vehicle>[] = [
    {
      label: "View",
      icon: <Eye className="w-3.5 h-3.5" />,
      onClick: (item) => handleView(item),
      variant: "outline",
      size: "sm",
    },
    {
      label: "Edit",
      icon: <Pencil className="w-3.5 h-3.5" />,
      onClick: (item) => handleEdit(item),
      variant: "outline",
      size: "sm",
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-3.5 h-3.5" />,
      onClick: (item) => handleDelete(item),
      variant: "reject-soft",
      size: "sm",
    },
  ];

  return (
    <DataTable
      data={vehicles}
      columns={columns}
      actions={actions}
      keyExtractor={(item) => item.id}
      onRowClick={handleRowClick}
      selectedId={selectedId}
      totalItems={totalItems}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showPagination={true}
      showRecordCount={true}
      emptyMessage="No vehicles found"
    />
  );
}