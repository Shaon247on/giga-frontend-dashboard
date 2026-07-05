import type { AccountsDashboardData } from "../types";

export const MOCK_ACCOUNTS_DASHBOARD_DATA: AccountsDashboardData = {
  statCards: [
    {
      id: "total",
      count: 0,
      trendValue: 14.2,
      label: "Total Expenses",
      subtitle: "June 2026 period",
      trend: "up",
      amount: 813.15,
      icon: "total",
    },
    {
      id: "pending",
      count: 2,
      label: "Pending Review",
      subtitle: "$136 outstanding",
      trend: "down",
      trendValue: -8.5,
      amount: 136.0,
      icon: "pending",
    },
    {
      id: "reviewed",
      count: 2,
      label: "Reviewed",
      subtitle: "Ready for payment",
      trend: "even",
      trendValue: 0,
      amount: 258.0,
      icon: "reviewed",
    },
    {
      id: "paid",
      count: 1,
      label: "Paid / Processed",
      subtitle: "This period",
      trend: "up",
      trendValue: 22.8,
      amount: 555.0,
      icon: "paid",
    },
  ],
  quickAccessCards: [
    {
      id: "personal-expenses",
      title: "Personal Expenses",
      description: "Review and process employee reimbursement submissions",
      href: "/accounts/expenses",
      icon: "personal",
      amount: 258,
      entries: 3,
    },
    {
      id: "visa-card",
      title: "Visa / Company Card",
      description: "Reconcile company card charges and Visa statements",
      href: "/accounts/cards",
      icon: "visa",
      amount: 745,
      entries: 8,
    },
    {
      id: "reports",
      title: "Reports & Exports",
      description:
        "Daily summaries, monthly reports, bookkeeping CSV/XLSX exports",
      href: "/accounts/reports",
      icon: "reports",
      amount: 96,
      entries: 2,
    },
  ],
  alertMessage: "2 expenses pending — $135.75 outstanding and awaiting review.",
  alertDate: "Tuesday, June 9, 2026 — Financial Overview",
  totalAmount: 813.15,
  pendingCount: 2,
  pendingAmount: 136.0,
  reviewedCount: 2,
  paidCount: 1,
};

export async function fetchAccountsDashboardData(): Promise<AccountsDashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_ACCOUNTS_DASHBOARD_DATA;
}
