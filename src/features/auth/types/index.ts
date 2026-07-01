// ── Auth step routing ────────────────────────────────────
export type AuthStep = "sign-in" | "forgot-password" | "verify-otp" | "reset-password";

// ── Form payloads ────────────────────────────────────────
export interface SignInInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface VerifyOtpInput {
  otp: string; // 6-digit string
}

export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string;
}

// ── API response shapes ──────────────────────────────────
export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: string;
  token: string;
}