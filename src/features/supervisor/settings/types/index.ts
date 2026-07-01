export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  employeeId: string;
  department: string;
  managedShops: string;
  directReports: string;
  avatarUrl: string | null;
  avatarInitials: string;
}

export interface UpdateProfileInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  managedShops: string; // always a string — empty string if none
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}