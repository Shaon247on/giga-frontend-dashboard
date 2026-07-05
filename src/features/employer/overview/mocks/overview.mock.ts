import type {
  OverviewPageData,
  RosterEmployee,
  TimeOffRequest,
  ExpenseItem,
  MaintenanceItem,
} from "../types";

export const MOCK_ROSTER_EMPLOYEES: RosterEmployee[] = [
  {
    id: "e1",
    name: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    role: "Employee",
    email: "marcus@fieldops.com",
    vehicle: "Van #12 — Ford Transit",
    todayPunch: "07:02 — 15:34 · Ottawa Shop",
    location: "Ottawa Shop",
    isActive: true,
  },
  {
    id: "e2",
    name: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    role: "Employee",
    email: "james@fieldops.com",
    vehicle: "Van #07 — Ford Transit",
    todayPunch: "07:15 — Active · Toronto Shop",
    location: "Toronto Shop",
    isActive: true,
  },
  {
    id: "e3",
    name: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    role: "Employee",
    email: "ethan@fieldops.com",
    vehicle: "Van #19 — Ram ProMaster",
    todayPunch: "08:00 — 16:10 · Hamilton Shop",
    location: "Hamilton Shop",
    isActive: true,
  },
  {
    id: "e4",
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    role: "Employee",
    email: "priya@fieldops.com",
    vehicle: "Van #03 — Ford Transit",
    todayPunch: "06:45 — 17:00 · Out of Town",
    location: "Out of Town",
    isActive: true,
  },
  {
    id: "e5",
    name: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    role: "Employee",
    email: "carlos@fieldops.com",
    vehicle: "Van #22 — Mercedes Sprinter",
    todayPunch: null,
    location: null,
    isActive: true,
  },
  {
    id: "e6",
    name: "Sandra Kim",
    initials: "SK",
    avatarColor: "#4F46E5",
    role: "Supervisor",
    email: "sandra@fieldops.com",
    vehicle: null,
    todayPunch: null,
    location: null,
    isActive: true,
  },
  {
    id: "e7",
    name: "Diane Patel",
    initials: "DP",
    avatarColor: "#1E3A5F",
    role: "Admin",
    email: "diane@fieldops.com",
    vehicle: null,
    todayPunch: null,
    location: null,
    isActive: true,
  },
];

export const MOCK_TIME_OFF: TimeOffRequest[] = [
  {
    id: "t1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    type: "Vacation",
    dateRange: "2026-06-20 — 2026-06-27 (return 2026-06-30)",
    reason: "Family trip",
    status: "pending",
  },
  {
    id: "t2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    type: "Sick Day",
    dateRange: "2026-06-03",
    reason: "Flu",
    status: "reviewed",
  },
  {
    id: "t3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    type: "Vacation",
    dateRange: "2026-07-14 — 2026-07-18 (return 2026-07-21)",
    reason: null,
    status: "approved",
  },
  {
    id: "t4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    type: "Sick Day",
    dateRange: "2026-05-28",
    reason: "Medical appointment",
    status: "reviewed",
  },
  {
    id: "t5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    type: "Vacation",
    dateRange: "2026-08-04 — 2026-08-08 (return 2026-08-11)",
    reason: "Personal",
    status: "denied",
  },
];

export const MOCK_EXPENSES: ExpenseItem[] = [
  {
    id: "x1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    type: "Personal",
    amount: 48.50,
    status: "pending",
  },
  {
    id: "x2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    type: "Personal",
    amount: 122.00,
    status: "paid",
  },
  {
    id: "x3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    type: "Visa",
    amount: 315.40,
    status: "reviewed",
  },
  {
    id: "x4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    type: "Personal",
    amount: 87.25,
    status: "pending",
  },
  {
    id: "x5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    type: "Visa",
    amount: 240.00,
    status: "reviewed",
  },
];

export const MOCK_MAINTENANCE: MaintenanceItem[] = [
  {
    id: "m1",
    vehicleLabel: "Van #12",
    issue: "Front left tire worn, replacement needed",
    reportedBy: "Marcus Rivera",
    date: "2026-05-30",
    status: "open",
  },
  {
    id: "m2",
    vehicleLabel: "Van #07",
    issue: "AC not cooling",
    reportedBy: "James Nguyen",
    date: "2026-06-01",
    status: "in-progress",
  },
  {
    id: "m3",
    vehicleLabel: "Van #03",
    issue: "Check engine light on",
    reportedBy: "Priya Sharma",
    date: "2026-06-03",
    status: "open",
  },
  {
    id: "m4",
    vehicleLabel: "Van #19",
    issue: "Rear wiper blade broken",
    reportedBy: "Ethan Brooks",
    date: "2026-05-15",
    status: "completed",
  },
];

export const MOCK_OVERVIEW_DATA: OverviewPageData = {
  alerts: [
    { id: "a1", message: "Van #07 AC repair in progress" },
    { id: "a2", message: "3 open maintenance requests require attention" },
    {
      id: "a3",
      message: "Priya Sharma: missing punch-out June 3 — Out of Town",
    },
  ],
  statCards: [
    {
      id: "employees",
      value: "7/7",
      label: "Active Employees",
      iconVariant: "employees",
    },
    {
      id: "clocked",
      value: "1 on-site",
      label: "Clocked In Today",
      iconVariant: "clocked",
    },
    {
      id: "fuel",
      value: "$310",
      label: "Fleet Fuel (Month)",
      iconVariant: "fuel",
    },
    {
      id: "expenses",
      value: "$136",
      label: "Expenses Pending",
      iconVariant: "expenses",
    },
  ],
  weeklyHours: [
    { day: "Mon", hours: 72 },
    { day: "Tue", hours: 68 },
    { day: "Wed", hours: 75 },
    { day: "Thu", hours: 70 },
    { day: "Fri", hours: 55 },
    { day: "Sat", hours: 12 },
    { day: "Sun", hours: 0 },
  ],
  employees: MOCK_ROSTER_EMPLOYEES,
  timeOff: MOCK_TIME_OFF,
  timeOffSummary: { pending: 1, approved: 1, denied: 1 },
  expenses: MOCK_EXPENSES,
  expenseSummary: {
    personalPending: 135.75,
    personalPaid: 122.00,
    visaTotal: 555.40,
    grandTotal: 813.15,
  },
  maintenance: MOCK_MAINTENANCE,
};

export async function fetchOverviewData(): Promise<OverviewPageData> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_OVERVIEW_DATA;
}

export async function fetchRosterEmployees(): Promise<RosterEmployee[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_ROSTER_EMPLOYEES;
}

export async function fetchTimeOffRequests(): Promise<TimeOffRequest[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_TIME_OFF;
}

export async function fetchExpenses(): Promise<ExpenseItem[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_EXPENSES;
}

export async function fetchMaintenance(): Promise<MaintenanceItem[]> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_MAINTENANCE;
}