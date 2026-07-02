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
  | "active"
  | "inactive"
  | "reviewed"
  | "pending"
  | "approved"
  | "rejected"
  | "flagged"
  | "open"
  | "in-progress"
  | "completed"
  | "maintenance"
  | "paid"
  | "submitted"
  | "under-review";

// ── Expense specific types ──
export type ExpenseStatus = Extract<Status, "pending" | "reviewed" | "paid" | "submitted" | "under-review">;
export type ExpenseType = "personal" | "visa" | "company";

// ── Attendance specific types ──
export type AttendanceStatus = Extract<Status, "active" | "reviewed" | "pending">;

// ── Time Off specific types ──
export type TimeOffStatus = Extract<Status, "pending" | "approved" | "rejected">;

// ── Time Off Types ──
export type TimeOffType = "vacation" | "sick" | "personal" | "other";

// ── Filter types ──
export type AttendanceFilter = "all" | AttendanceStatus;
export type TimeOffFilter = "all" | TimeOffStatus;
export type ExpenseFilter = "all" | ExpenseStatus;