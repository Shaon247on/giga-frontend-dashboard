import { z } from "zod";

export const createVehicleSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900, "Year must be 1900 or later").max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  plateNumber: z.string().min(1, "Plate number is required"),
  vin: z.string().min(17, "VIN must be 17 characters").max(17, "VIN must be 17 characters"),
  currentMileage: z.number().min(0, "Mileage must be 0 or greater"),
  lastOilChangeMileage: z.number().min(0, "Oil change mileage must be 0 or greater"),
  insuranceExpiry: z.string().min(1, "Insurance expiry date is required"),
  assignedDriver: z.string().min(1, "Assigned driver is required"),
});

export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;