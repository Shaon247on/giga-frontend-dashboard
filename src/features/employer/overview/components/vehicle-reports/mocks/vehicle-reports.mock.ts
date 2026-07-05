import type { VehicleReportsPageData, MaintenanceItem } from "../types";

export const MOCK_MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: "m1",
    vehicleLabel: "Van #12",
    vehicleDetails: "Ford Transit 2022 - BXRT 442",
    problem: "Front left tire worn, replacement needed",
    note: "Tread depth below 2mm, vibration at highway speed",
    reportedBy: "Marcus Rivera",
    date: "2026-05-30",
    status: "open",
  },
  {
    id: "m2",
    vehicleLabel: "Van #07",
    vehicleDetails: "Ford Transit 2021 - AXPK 881",
    problem: "AC not cooling",
    note: "Warm air at maximum setting, possible refrigerant leak",
    reportedBy: "James Nguyen",
    date: "2026-06-01",
    status: "in-progress",
  },
  {
    id: "m3",
    vehicleLabel: "Van #03",
    vehicleDetails: "Ford Transit 2020 - DMKL 775",
    problem: "Check engine light on",
    note: "Light steady, no performance issues noticed yet",
    reportedBy: "Priya Sharma",
    date: "2026-06-03",
    status: "open",
  },
  {
    id: "m4",
    vehicleLabel: "Van #19",
    vehicleDetails: "Ram ProMaster 2023 - CVLT 210",
    problem: "Rear wiper blade broken",
    note: null,
    reportedBy: "Ethan Brooks",
    date: "2026-05-15",
    status: "completed",
  },
  {
    id: "m5",
    vehicleLabel: "Van #22",
    vehicleDetails: "Mercedes Sprinter 2022 - DMKL 882",
    problem: "Oil change overdue",
    note: "Last oil change at 45,000 km, current at 52,000 km",
    reportedBy: "Carlos Vega",
    date: "2026-06-02",
    status: "open",
  },
];

export const MOCK_VEHICLE_REPORTS_DATA: VehicleReportsPageData = {
  items: MOCK_MAINTENANCE_ITEMS,
  totalCount: 5,
  statusCounts: {
    open: 3,
    "in-progress": 1,
    completed: 1,
  },
};

export async function fetchVehicleReportsData(): Promise<VehicleReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_VEHICLE_REPORTS_DATA;
}