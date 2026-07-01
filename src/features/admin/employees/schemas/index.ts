import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  role: z.enum(["Employee", "Supervisor", "Admin"]),
  vehicle: z.string().optional(),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;