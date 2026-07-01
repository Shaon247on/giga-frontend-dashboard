import type { Status } from "@/types";

// ── Maintenance request status (subset of global Status) ──
export type MaintenanceStatus = Extract<Status, "open" | "in-progress" | "completed">;

// ── Maintenance request ──────────────────────────────────
export interface MaintenanceRequest {
  id: string;
  vehicleLabel: string;     // "Van #12"
  issue: string;            // "Front left tire worn, replacement needed"
  reportedBy: string;       // "Marcus Rivera"
  reportedDate: string;     // "2026-05-30"
  status: MaintenanceStatus;
  notes?: string;
  resolvedDate?: string;
}

// ── Stat cards ────────────────────────────────────────────
export interface VehicleStatCard {
  id: string;
  count: number;
  label: string;
  iconVariant: "open" | "in-progress" | "completed";
}

// ── Page data shape ──────────────────────────────────────
export interface VehiclesPageData {
  statCards: VehicleStatCard[];
  requests: MaintenanceRequest[];
}