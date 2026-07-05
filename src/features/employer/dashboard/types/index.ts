import type { Status } from "@/types";

// ── Stat cards ────────────────────────────────────────────
export interface EmployerStatCard {
  id: string;
  value: string;
  sublabel: string;
  linkLabel: string;
  linkHref: string;
  iconVariant: "employees" | "expenses" | "vehicles" | "timeoff";
}

// ── Alerts ────────────────────────────────────────────────
export type AlertSeverity = "warning" | "error" | "info" | "pending";

export interface EmployerAlert {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  severity: AlertSeverity;
}

// ── Attendance row ────────────────────────────────────────
export interface EmployerAttendanceRow {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  location: string;
  clockIn: string;
  clockOut: string;   // "" if still active
  hours: number | null;
  status: Status;
}

// ── Full page data ────────────────────────────────────────
export interface EmployerDashboardData {
  greeting: string;
  dateLabel: string;
  activeNowCount: number;
  statCards: EmployerStatCard[];
  alerts: EmployerAlert[];
  newAlertCount: number;
  todaysAttendance: EmployerAttendanceRow[];
}