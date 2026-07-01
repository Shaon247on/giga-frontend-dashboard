import { z } from "zod";

const phoneRegex = /^\+?[\d\s().-]{7,20}$/;

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be under 80 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),

  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Enter a valid phone number"),

  department: z
    .string()
    .trim()
    .min(2, "Department is required")
    .max(60, "Department must be under 60 characters"),

  // Keep as plain string — required, just allow empty string as valid input
  managedShops: z
    .string()
    .trim()
    .max(200, "Managed shops must be under 200 characters"),
});

// Use z.input<> for the form field values (what RHF manages)
// Use z.output<> for the validated/submitted values
export type ProfileFormValues = z.input<typeof profileSchema>;
export type ProfileSubmitValues = z.output<typeof profileSchema>;