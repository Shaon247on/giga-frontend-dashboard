import type { ExpenseStatus } from "@/types";

export type ExpenseType = "direct" | "shop";

export interface AccountExpense {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  date: string;
  amount: number;
  tax: number;
  total: number;
  poNumber: string;
  jobNumber: string;
  type: ExpenseType;
  status: ExpenseStatus;
  paidDate?: string | null;
  receiptId: string;
}

export interface ExpensePreviewData {
  expense: AccountExpense;
  receipt: {
    vendor: string;
    taxId: string;
    date: string;
    employee: string;
    poNumber: string;
    jobNumber: string;
    jobType: string;
    subtotal: number;
    tax: number;
    total: number;
  };
}

export interface ExpensesPageData {
  expenses: AccountExpense[];
  totalCount: number;
}