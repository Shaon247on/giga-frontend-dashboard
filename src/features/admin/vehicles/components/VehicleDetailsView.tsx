"use client";

// import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  FileText,
  Gauge,
  ShieldAlert,
  Droplets,
  Car,
  Badge,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VehicleDetailsTabs } from "./VehicleDetailsTabs";
import type {
  Vehicle,
  FleetRecord,
  FuelReport,
  RepairRequest,
  OilChangeRecord,
} from "../types";

interface VehicleDetailsViewProps {
  vehicle: Vehicle;
  fleetList: FleetRecord[];
  fuelReports: FuelReport[];
  repairRequests: RepairRequest[];
  oilChanges: OilChangeRecord[];
}

export function VehicleDetailsView({
  vehicle,
  fleetList,
  fuelReports,
  repairRequests,
  oilChanges,
}: VehicleDetailsViewProps) {
  // const router = useRouter();

  // const handleBack = () => {
  //   router.push("/admin/vehicles");
  // };

  const infoCards = [
    {
      icon: <Badge className="w-4 h-4" />,
      label: "Vehicle Number",
      value: vehicle.vehicleNumber,
    },
    {
      icon: <Car className="w-4 h-4" />,
      label: "Make / Model",
      value: `${vehicle.make} ${vehicle.model}`,
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "Year",
      value: vehicle.year,
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Plate / VIN",
      value: `${vehicle.plateNumber} / ${vehicle.vin}`,
    },
    {
      icon: <Gauge className="w-4 h-4" />,
      label: "Current Mileage",
      value: `${vehicle.currentMileage.toLocaleString()} km`,
    },
    {
      icon: <Droplets className="w-4 h-4" />,
      label: "Last Oil Change",
      value: `${vehicle.lastOilChangeMileage.toLocaleString()} km`,
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      label: "Insurance Expiry",
      value: vehicle.insuranceExpiry,
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Assigned Driver",
      value: (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: vehicle.driverColor }}
          >
            <span className="text-[9px] font-bold text-white">
              {vehicle.driverInitials}
            </span>
          </div>
          <span>{vehicle.assignedDriver}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
      <div className="flex bg-card p-4 rounded-xl items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              {vehicle.vehicleNumber}
            </h1>
            <StatusBadge status={vehicle.status} />
          </div>
          <p className="text-sm text-secondary-txt mt-1">
            {vehicle.year} {vehicle.make} {vehicle.model} •{" "}
            {vehicle.plateNumber}
          </p>
        </div>
      </div>
      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/60 shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary-txt shrink-0">
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-table-header uppercase tracking-wide">
                {card.label}
              </p>
              <div className="text-[13px] font-medium text-primary-txt leading-tight mt-0.5">
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <VehicleDetailsTabs
          fleetList={fleetList}
          fuelReports={fuelReports}
          repairRequests={repairRequests}
          oilChanges={oilChanges}
        />
      </div>
    </div>
  );
}
