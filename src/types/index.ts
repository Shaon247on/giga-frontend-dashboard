export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  avatarColor?: string;
}

export interface PageMeta {
  title: string;
  subtitle?: string;
}

export type Status =
  // General
  | "active"
  | "inactive"
  // Review states
  | "reviewed"
  | "pending"
  | "approved"
  | "rejected"
  | "flagged"
  // Progress states
  | "open"
  | "in-progress"
  | "completed"
  // Vehicle
  | "maintenance"
  // Expense
  | "paid"
  | "submitted"
  | "under-review"
  | "reimbursed"
  // Time Off
  | "denied";

// ── Expense specific types ──
export type ExpenseStatus = Extract<Status, "pending" | "reviewed" | "paid" | "submitted" | "under-review" | "reimbursed" | "rejected">;
export type ExpenseType = "personal" | "visa" | "company";

// ── Attendance specific types ──
export type AttendanceStatus = Extract<Status, "active" | "reviewed" | "pending">;

// ── Time Off specific types ──
export type TimeOffStatus = Extract<Status, "pending" | "approved" | "rejected" | "reviewed" | "denied">;

// ── Time Off Types ──
export type TimeOffType = "vacation" | "sick" | "personal" | "other";

// ── Maintenance specific types ──
export type MaintenanceStatus = Extract<Status, "open" | "in-progress" | "completed">;

// ── Filter types ──
export type AttendanceFilter = "all" | AttendanceStatus;
export type TimeOffFilter = "all" | TimeOffStatus;
export type ExpenseFilter = "all" | ExpenseStatus;
export type MaintenanceFilter = "all" | MaintenanceStatus;