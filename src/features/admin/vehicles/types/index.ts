import type { Status } from "@/types";

export type VehicleStatus = Extract<Status, "active" | "inactive" | "maintenance">;
export type RepairStatus = Extract<Status, "open" | "in-progress" | "completed">;

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  currentMileage: number;
  lastOilChangeMileage: number;
  insuranceExpiry: string;
  assignedDriver: string;
  status: VehicleStatus;
  driverInitials: string;
  driverColor: string;
}

export interface FleetRecord {
  id: string;
  vehicle: string;
  yearMake: string;
  plate: string;
  mileage: number;
  assignedTo: string;
  oilChange: string;
}

export interface FuelReport {
  id: string;
  employee: string;
  date: string;
  mileage: number;
  liters: number;
  amount: number;
  lPer100km: number;
}

export interface RepairRequest {
  id: string;
  title: string;
  subtitle: string;
  requester: string;
  requesterInitials: string;
  requesterColor: string;
  requestDate: string;
  status: RepairStatus;
}

export interface OilChangeRecord {
  id: string;
  currentMileage: number;
  lastOilChange: number;
  remaining: number;
  limitKm: number;
}

export interface VehiclesPageData {
  vehicles: Vehicle[];
  fleetList: FleetRecord[];
  fuelReports: FuelReport[];
  repairRequests: RepairRequest[];
  oilChanges: OilChangeRecord[];
  totalCount: number;
}

export interface CreateVehicleData {
  vehicleNumber: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  currentMileage: number;
  lastOilChangeMileage: number;
  insuranceExpiry: string;
  assignedDriver: string;
}

export interface UpdateVehicleData extends Partial<CreateVehicleData> {
  id: string;
  status?: VehicleStatus;
}