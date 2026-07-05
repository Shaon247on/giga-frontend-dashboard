import type {
  TimeOffStatus,
  ExpenseStatus,
  MaintenanceStatus,
} from "@/types";

// ── Alert banners ─────────────────────────────────────────
export interface OverviewAlert {
  id: string;
  message: string;
}

// ── Stat cards ────────────────────────────────────────────
export interface OverviewStatCard {
  id: string;
  value: string;
  label: string;
  iconVariant: "employees" | "clocked" | "fuel" | "expenses";
}

// ── Chart ─────────────────────────────────────────────────
export interface WeeklyHoursBar {
  day: string;
  hours: number;
}

// ── Employee Roster ───────────────────────────────────────
export type EmployeeRosterRole = "Employee" | "Supervisor" | "Admin";

export interface RosterEmployee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: EmployeeRosterRole;
  email: string;
  vehicle: string | null;
  todayPunch: string | null;
  location: string | null;
  isActive: boolean;
}

// ── Time Off ──────────────────────────────────────────────
export type TimeOffType = "Vacation" | "Sick Day";

export interface TimeOffRequest {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  type: TimeOffType;
  dateRange: string;
  reason: string | null;
  status: TimeOffStatus;
}

export interface TimeOffSummary {
  pending: number;
  approved: number;
  denied: number;
}

// ── Expenses ──────────────────────────────────────────────
export type ExpenseType = "Personal" | "Visa";

export interface ExpenseItem {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  type: ExpenseType;
  amount: number;
  status: ExpenseStatus;
}

export interface ExpenseSummary {
  personalPending: number;
  personalPaid: number;
  visaTotal: number;
  grandTotal: number;
}

// ── Vehicle Maintenance ───────────────────────────────────
export interface MaintenanceItem {
  id: string;
  vehicleLabel: string;
  issue: string;
  reportedBy: string;
  date: string;
  status: MaintenanceStatus;
}

// ── Full overview page data ───────────────────────────────
export interface OverviewPageData {
  alerts: OverviewAlert[];
  statCards: OverviewStatCard[];
  weeklyHours: WeeklyHoursBar[];
  employees: RosterEmployee[];
  timeOff: TimeOffRequest[];
  timeOffSummary: TimeOffSummary;
  expenses: ExpenseItem[];
  expenseSummary: ExpenseSummary;
  maintenance: MaintenanceItem[];
}