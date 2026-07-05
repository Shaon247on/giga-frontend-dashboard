import type { Status } from "@/types";

export type ExpenseStatus = Extract<Status, "pending" | "paid" | "reviewed">;
export type ExpenseType = "Personal" | "Visa";

export interface ExpenseItem {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  type: ExpenseType;
  amount: number;
  tax: number;
  poNumber: string;
  jobNumber: string;
  jobType: string;
  date: string;
  status: ExpenseStatus;
}

export interface ExpenseReportsPageData {
  items: ExpenseItem[];
  totalCount: number;
  summary: {
    grandTotal: number;
    personalTotal: number;
    visaTotal: number;
    pendingTotal: number;
  };
}