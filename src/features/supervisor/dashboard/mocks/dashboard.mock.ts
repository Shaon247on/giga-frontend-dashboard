import type { DashboardData } from "../types";

export const MOCK_DASHBOARD_DATA: DashboardData = {
  greeting: "Good morning, Supervisor",
  dateLabel: "Tuesday, June 9, 2026 — Operations Overview",

  statCards: [
    {
      id: "clocked-in",
      count: 1,
      label: "employees clocked in",
      sublabel: "+2 from yesterday",
      iconVariant: "employees",
    },
    {
      id: "needs-review",
      count: 2,
      label: "need your review",
      sublabel: "Manual entries flagged",
      iconVariant: "review",
    },
    {
      id: "requests",
      count: 1,
      label: "requests awaiting",
      sublabel: "Vacation & sick days",
      iconVariant: "requests",
    },
    {
      id: "repair",
      count: 3,
      label: "repair requests",
      sublabel: "Vehicles need attention",
      iconVariant: "repair",
    },
  ],

  newAlertCount: 4,

  recentAlerts: [
    {
      id: "alert-1",
      title: "Carlos Vega submitted manual punch",
      description: "Ottawa Shop • Awaiting review",
      timeAgo: "1h ago",
      severity: "warning",
    },
    {
      id: "alert-2",
      title: "Priya Sharma: missing clock-out",
      description: "Jun 3 — Out of Town",
      timeAgo: "2h ago",
      severity: "error",
    },
    {
      id: "alert-3",
      title: "Marcus Rivera — Vacation request",
      description: "Jun 20 – Jun 27 • Pending approval",
      timeAgo: "3h ago",
      severity: "info",
    },
    {
      id: "alert-4",
      title: "Truck #T-004 maintenance request",
      description: "Brake noise reported by Jordan Lee",
      timeAgo: "5h ago",
      severity: "pending",
    },
  ],

  todaysAttendance: [
    {
      id: "emp-1",
      employeeName: "Marcus Rivera",
      initials: "MR",
      avatarColor: "#8B5CF6",
      location: "Ottawa Shop",
      clockIn: "07:02",
      clockOut: "15:34",
      status: "reviewed",
    },
    {
      id: "emp-2",
      employeeName: "James Nguyen",
      initials: "JN",
      avatarColor: "#3B82F6",
      location: "Toronto Shop",
      clockIn: "07:15",
      clockOut: "",
      status: "active",
    },
    {
      id: "emp-3",
      employeeName: "Ethan Brooks",
      initials: "EB",
      avatarColor: "#10B981",
      location: "Hamilton Shop",
      clockIn: "08:00",
      clockOut: "16:10",
      status: "reviewed",
    },
    {
      id: "emp-4",
      employeeName: "Priya Sharma",
      initials: "PS",
      avatarColor: "#F59E0B",
      location: "Out of Town — Project Alpha",
      clockIn: "06:45",
      clockOut: "17:00",
      status: "pending",
    },
  ],
};

// Simulates a real async API call
export async function fetchDashboardData(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_DASHBOARD_DATA;
}