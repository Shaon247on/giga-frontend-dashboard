import type { Status } from "@/types";

// ── Filter tabs ──────────────────────────────────────────
export type AttendanceFilter = "all" | "pending-review" | "manual-entry" | "out-of-town";

export interface FilterTab {
  value: AttendanceFilter;
  label: string;
  badge?: number;
}

// ── Attendance record ────────────────────────────────────
export type PunchType = "regular" | "manual" | "out-of-town";

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  location: string;
  date: string;          // "2026-06-04"
  clockIn: string;       // "07:02"
  clockOut: string;      // "15:34" | "" if active
  hours: number;
  type: PunchType;
  status: Status;
}

// ── Stat card shape ──────────────────────────────────────
export interface AttendanceStatCard {
  id: string;
  count: number;
  label: string;
  iconVariant: "pending" | "manual" | "active";
}

// ── Full page data ───────────────────────────────────────
export interface AttendancePageData {
  statCards: AttendanceStatCard[];
  records: AttendanceRecord[];
  filterTabs: FilterTab[];
}