import type { MaintenanceStatus } from "@/types";

export interface VehicleReportItem {
  id: string;
  vehicleLabel: string;
  makeModel: string;
  assignedTo: string;
  initials: string;
  avatarColor: string;
  mileage: number;
  fuelCost: number;
  liters: number;
  maintenanceStatus: MaintenanceStatus;
}

export interface VehicleReportsPageData {
  vehicles: VehicleReportItem[];
  totalCount: number;
  summary: {
    totalVehicles: number;
    totalFuelCost: number;
    openMaintenance: number;
  };
  fuelData: {
    vehicle: string;
    liters: number;
    cost: number;
  }[];
}