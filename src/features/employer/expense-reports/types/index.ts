import type { ExpenseStatus, ExpenseType } from "@/types";

export interface ExpenseReportItem {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  date: string;
  type: ExpenseType;
  poNumber: string;
  jobNumber: string;
  amount: number;
  tax: number;
  total: number;
  status: ExpenseStatus;
}

export interface ExpenseReportsPageData {
  items: ExpenseReportItem[];
  totalCount: number;
  summary: {
    grandTotal: number;
    personalTotal: number;
    visaTotal: number;
    pendingTotal: number;
  };
  breakdown: {
    personal: {
      percentage: number;
      paid: number;
    };
    visa: {
      percentage: number;
      paid: number;
    };
  };
}