import type { MaintenanceStatus } from "../types";

export const VEHICLE_ICON_BG: Record<MaintenanceStatus, string> = {
  open: "bg-orange-50",
  "in-progress": "bg-blue-50",
  completed: "bg-emerald-50",
};

export const VEHICLE_ICON_COLOR: Record<MaintenanceStatus, string> = {
  open: "text-orange-400",
  "in-progress": "text-blue-500",
  completed: "text-emerald-500",
};