import { Status } from "@/types";

// ── Stat Cards ──────────────────────────────────────────
export interface StatCard {
  id: string;
  count: number;
  label: string;
  sublabel: string;
  iconVariant: "employees" | "review" | "requests" | "repair";
}

// ── Recent Alerts ───────────────────────────────────────
export type AlertSeverity = "warning" | "error" | "info" | "pending";

export interface RecentAlert {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  severity: AlertSeverity;
}

// ── Today's Attendance ──────────────────────────────────
export interface AttendanceRow {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  location: string;
  clockIn: string;
  clockOut: string;
  status: Status;
}

// ── Full dashboard data shape ───────────────────────────
export interface DashboardData {
  greeting: string;
  dateLabel: string;
  statCards: StatCard[];
  recentAlerts: RecentAlert[];
  newAlertCount: number;
  todaysAttendance: AttendanceRow[];
}