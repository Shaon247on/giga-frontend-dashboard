export interface AccountsStatCard {
  id: string;
  count: number;
  label: string;
  subtitle?: string;
  amount?: number;
  trend?: "up" | "down" | "even" 
  trendValue?: number;
  icon: "total" | "pending" | "reviewed" | "paid";
}

export interface AccountsQuickAccessCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "personal" | "visa" | "reports";
   amount: number;
  entries: number;
}

export interface AccountsDashboardData {
  statCards: AccountsStatCard[];
  quickAccessCards: AccountsQuickAccessCard[];
  alertMessage?: string;
  alertDate?: string;
  totalAmount?: number;
  pendingCount?: number;
  pendingAmount?: number;
  reviewedCount?: number;
  paidCount?: number;
}