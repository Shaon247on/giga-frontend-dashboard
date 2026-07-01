import { z } from "zod";

// ── Sign In ──────────────────────────────────────────────
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// ── Forgot Password ──────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Enter a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ── Verify OTP ───────────────────────────────────────────
export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 numbers"),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

// ── Reset Password ───────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;