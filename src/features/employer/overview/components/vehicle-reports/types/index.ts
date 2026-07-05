import type { MaintenanceStatus } from "@/types";


export interface MaintenanceItem {
  id: string;
  vehicleLabel: string;
  vehicleDetails: string;
  problem: string;
  note: string | null;
  reportedBy: string;
  date: string;
  status: MaintenanceStatus;
}

export interface VehicleReportsPageData {
  items: MaintenanceItem[];
  totalCount: number;
  statusCounts: {
    open: number;
    "in-progress": number;
    completed: number;
  };
}