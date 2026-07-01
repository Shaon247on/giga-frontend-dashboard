import type { UserProfile, UpdateProfileInput, UpdatePasswordInput } from "../types";

export const MOCK_USER_PROFILE: UserProfile = {
  id: "user-1",
  fullName: "Mohammad AnaYet",
  email: "your@gmail.com",
  phoneNumber: "+1 (613) 555-0192",
  role: "Supervisor / Manager",
  employeeId: "SUP-0007",
  department: "Operations",
  managedShops: "Ottawa Shop, Toronto Shop, Barrie Shop",
  directReports: "5 field employees",
  avatarUrl: null,
  avatarInitials: "??",
};

// ── Simulated async API calls ────────────────────────────
export async function fetchUserProfile(): Promise<UserProfile> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_USER_PROFILE;
}

export async function updateUserProfile(input: UpdateProfileInput) {
  await new Promise((r) => setTimeout(r, 500));
  console.log("[mock] profile updated", input);
  return { success: true };
}

export async function updateUserPassword(input: UpdatePasswordInput) {
  await new Promise((r) => setTimeout(r, 500));
  // Simulate a server-side check — e.g. wrong current password
  if (input.currentPassword === "wrongpassword") {
    throw new Error("Current password is incorrect");
  }
  console.log("[mock] password updated");
  return { success: true };
}