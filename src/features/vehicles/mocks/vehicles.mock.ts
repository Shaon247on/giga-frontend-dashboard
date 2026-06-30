import type { VehiclesPageData, MaintenanceRequest } from "../types";

export const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: "veh-1",
    vehicleLabel: "Van #12",
    issue: "Front left tire worn, replacement needed",
    reportedBy: "Marcus Rivera",
    reportedDate: "2026-05-30",
    status: "open",
  },
  {
    id: "veh-2",
    vehicleLabel: "Van #07",
    issue: "AC not cooling",
    reportedBy: "James Nguyen",
    reportedDate: "2026-06-01",
    status: "in-progress",
  },
  {
    id: "veh-3",
    vehicleLabel: "Van #03",
    issue: "Check engine light on",
    reportedBy: "Priya Sharma",
    reportedDate: "2026-06-03",
    status: "open",
  },
  {
    id: "veh-4",
    vehicleLabel: "Van #19",
    issue: "Rear wiper blade broken",
    reportedBy: "Ethan Brooks",
    reportedDate: "2026-05-15",
    status: "completed",
    resolvedDate: "2026-05-18",
  },
];

export const MOCK_VEHICLES_PAGE_DATA: VehiclesPageData = {
  statCards: [
    { id: "open", count: 2, label: "Open", iconVariant: "open" },
    { id: "in-progress", count: 1, label: "In Progress", iconVariant: "in-progress" },
    { id: "completed", count: 1, label: "Completed", iconVariant: "completed" },
  ],
  requests: MOCK_MAINTENANCE_REQUESTS,
};

// ── Simulated async API calls ────────────────────────────
export async function fetchVehiclesPageData(): Promise<VehiclesPageData> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_VEHICLES_PAGE_DATA;
}

export async function fetchMaintenanceRequest(id: string): Promise<MaintenanceRequest | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_MAINTENANCE_REQUESTS.find((r) => r.id === id) ?? null;
}