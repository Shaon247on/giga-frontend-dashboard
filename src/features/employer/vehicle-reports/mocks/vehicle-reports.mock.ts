import type { VehicleReportsPageData, VehicleReportItem } from "../types";

export const MOCK_VEHICLES: VehicleReportItem[] = [
  {
    id: "v1",
    vehicleLabel: "Van #12",
    makeModel: "Ford Transit 2022",
    assignedTo: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    mileage: 87430,
    fuelCost: 132.60,
    liters: 101.4,
    maintenanceStatus: "open",
  },
  {
    id: "v2",
    vehicleLabel: "Van #07",
    makeModel: "Ford Transit 2021",
    assignedTo: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    mileage: 112450,
    fuelCost: 72.10,
    liters: 55.2,
    maintenanceStatus: "in-progress",
  },
  {
    id: "v3",
    vehicleLabel: "Van #19",
    makeModel: "Ram ProMaster 2023",
    assignedTo: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    mileage: 44200,
    fuelCost: 45.60,
    liters: 34.9,
    maintenanceStatus: "completed",
  },
  {
    id: "v4",
    vehicleLabel: "Van #03",
    makeModel: "Ford Transit 2020",
    assignedTo: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    mileage: 154300,
    fuelCost: 0,
    liters: 0,
    maintenanceStatus: "open",
  },
  {
    id: "v5",
    vehicleLabel: "Van #22",
    makeModel: "Mercedes Sprinter 2022",
    assignedTo: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    mileage: 68100,
    fuelCost: 59.80,
    liters: 45.8,
    maintenanceStatus: "open",
  },
];

export const MOCK_VEHICLE_REPORTS_DATA: VehicleReportsPageData = {
  vehicles: MOCK_VEHICLES,
  totalCount: MOCK_VEHICLES.length,
  summary: {
    totalVehicles: 5,
    totalFuelCost: 310.10,
    openMaintenance: 3,
  },
  fuelData: MOCK_VEHICLES.map((v) => ({
    vehicle: v.vehicleLabel,
    liters: v.liters,
    cost: v.fuelCost,
  })),
};

export async function fetchVehicleReportsData(): Promise<VehicleReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_VEHICLE_REPORTS_DATA;
}