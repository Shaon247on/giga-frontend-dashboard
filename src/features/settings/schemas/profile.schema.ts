import { z } from "zod";

// E.164-ish loose phone validation — accepts formats like +1 (613) 555-0192
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

  managedShops: z
    .string()
    .trim()
    .max(200, "Managed shops must be under 200 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;