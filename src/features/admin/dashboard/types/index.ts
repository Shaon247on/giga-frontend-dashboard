export interface AdminStatCard {
  id: string;
  count: number;
  label: string;
  subtitle?: string;
  icon: "users" | "calendar" | "dollar-sign" | "truck";
}

export interface AdminQuickAccessCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "users" | "truck" | "clock" | "dollar-sign";
}

export interface AdminDashboardData {
  statCards: AdminStatCard[];
  quickAccessCards: AdminQuickAccessCard[];
  employeeCount: number;
  recordsCount: number;
}