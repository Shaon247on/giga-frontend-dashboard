import type { AdminDashboardData } from "../types";

export const MOCK_ADMIN_DASHBOARD_DATA: AdminDashboardData = {
  statCards: [
    {
      id: "active-employees",
      count: 1,
      label: "Active Employees",
      subtitle: "clocked in today",
      icon: "users",
    },
    {
      id: "pending-timeoff",
      count: 1,
      label: "Pending Time Off",
      subtitle: "requests awaiting",
      icon: "calendar",
    },
    {
      id: "pending-expenses",
      count: 2,
      label: "Pending Expenses",
      subtitle: "$136 total",
      icon: "dollar-sign",
    },
    {
      id: "fleet-vehicles",
      count: 5,
      label: "Fleet Vehicles",
      subtitle: "registered vehicles",
      icon: "truck",
    },
  ],
  quickAccessCards: [
    {
      id: "employee-management",
      title: "Employee Management",
      description: "Add employees, assign roles, manage profiles and vehicles",
      href: "/admin/employees",
      icon: "users",
    },
    {
      id: "vehicle-management",
      title: "Vehicle Management",
      description: "Fleet registry, assignment, and maintenance tracking",
      href: "/admin/vehicles",
      icon: "truck",
    },
    {
      id: "attendance-timeoff",
      title: "Punch Card & Time Off",
      description: "Weekly reports, attendance records and leave approvals",
      href: "/admin/attendance",
      icon: "clock",
    },
    {
      id: "expense-management",
      title: "Expense Management",
      description: "Review personal & Visa expenses, process payments",
      href: "/admin/expenses",
      icon: "dollar-sign",
    },
  ],
  employeeCount: 7,
  recordsCount: 5,
};

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_ADMIN_DASHBOARD_DATA;
}