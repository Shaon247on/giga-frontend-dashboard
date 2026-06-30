// ── Profile / Personal Information ───────────────────────
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  employeeId: string;
  department: string;
  managedShops: string; // comma-separated shop names
  directReports: string;
  avatarUrl: string | null;
  avatarInitials: string;
}

// ── Mutation payloads ────────────────────────────────────
export interface UpdateProfileInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  managedShops: string;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}