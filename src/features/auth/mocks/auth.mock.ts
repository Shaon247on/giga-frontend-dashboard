import type {
  SignInInput,
  ForgotPasswordInput,
  VerifyOtpInput,
  ResetPasswordInput,
  AuthSession,
} from "../types";

export async function signIn(input: SignInInput): Promise<AuthSession> {
  await new Promise((r) => setTimeout(r, 800));
  // Simulate wrong credentials
  if (input.password === "wrongpassword") {
    throw new Error("Invalid email or password");
  }
  return {
    userId: "user-1",
    name: "Mohammad AnaYet",
    email: input.email,
    role: "Supervisor / Manager",
    token: "mock-jwt-token",
  };
}

export async function sendOtp(input: ForgotPasswordInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  // Simulate email not found
  if (input.email === "notfound@company.com") {
    throw new Error("No account found with this email");
  }
}

export async function verifyOtp(input: VerifyOtpInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  if (input.otp !== "123456") {
    throw new Error("Incorrect or expired code. Please try again.");
  }
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 700));
  console.log("[mock] password reset", input.newPassword);
}