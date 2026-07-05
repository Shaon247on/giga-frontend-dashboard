import type { EmployerDashboardData } from "../types";

export const MOCK_EMPLOYER_DASHBOARD: EmployerDashboardData = {
  greeting: "Owner Dashboard",
  dateLabel: "Tuesday, June 9, 2026 — FieldOps Operations Ltd.",
  activeNowCount: 1,

  statCards: [
    {
      id: "employees",
      value: "7 / 7",
      sublabel: "1 clocked in today",
      linkLabel: "Employees Active",
      linkHref: "/employer/overview",
      iconVariant: "employees",
    },
    {
      id: "expenses",
      value: "$136",
      sublabel: "2 submissions waiting",
      linkLabel: "Expenses Pending",
      linkHref: "/employer/expense-reports",
      iconVariant: "expenses",
    },
    {
      id: "vehicles",
      value: "3 open",
      sublabel: "1 in progress",
      linkLabel: "Vehicle Maintenance",
      linkHref: "/employer/vehicle-reports",
      iconVariant: "vehicles",
    },
    {
      id: "timeoff",
      value: "1 pending",
      sublabel: "1 already approved",
      linkLabel: "Time Off Requests",
      linkHref: "/employer/punch-reports",
      iconVariant: "timeoff",
    },
  ],

  newAlertCount: 4,

  alerts: [
    {
      id: "a1",
      title: "Carlos Vega — manual punch submitted",
      description: "Ottawa Shop • Awaiting review",
      timeAgo: "1h ago",
      severity: "warning",
    },
    {
      id: "a2",
      title: "Priya Sharma: missing clock-out",
      description: "Jun 3 — Out of Town",
      timeAgo: "2h ago",
      severity: "error",
    },
    {
      id: "a3",
      title: "Marcus Rivera — Vacation request",
      description: "Jun 20–27 • Pending approval",
      timeAgo: "3h ago",
      severity: "info",
    },
    {
      id: "a4",
      title: "Van #07 AC repair in progress",
      description: "James Nguyen reported",
      timeAgo: "5h ago",
      severity: "pending",
    },
  ],

  todaysAttendance: [
    {
      id: "emp-1",
      employeeName: "Marcus Rivera",
      initials: "MR",
      avatarColor: "#4F46E5",
      location: "Ottawa Shop",
      clockIn: "07:02",
      clockOut: "15:34",
      hours: 8.5,
      status: "reviewed",
    },
    {
      id: "emp-2",
      employeeName: "James Nguyen",
      initials: "JN",
      avatarColor: "#0F172B",
      location: "Toronto Shop",
      clockIn: "07:15",
      clockOut: "",
      hours: null,
      status: "active",
    },
    {
      id: "emp-3",
      employeeName: "Ethan Brooks",
      initials: "EB",
      avatarColor: "#1E40AF",
      location: "Hamilton Shop",
      clockIn: "08:00",
      clockOut: "16:10",
      hours: 8.2,
      status: "reviewed",
    },
    {
      id: "emp-4",
      employeeName: "Priya Sharma",
      initials: "PS",
      avatarColor: "#7C3AED",
      location: "Out of Town — Project Alpha",
      clockIn: "06:45",
      clockOut: "17:00",
      hours: 10.25,
      status: "pending",
    },
  ],
};

export async function fetchEmployerDashboard(): Promise<EmployerDashboardData> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_EMPLOYER_DASHBOARD;
}