import type { ExpenseStatus, ExpenseType } from "@/types";

export interface Expense {
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
  receiptId: string;
  description?: string;
  paidDate?: string | null;
}

export interface ExpenseStat {
  label: string;
  count: number;
  amount?: number;
  icon: "pending" | "reviewed" | "paid" | "total";
}

export interface ExpensePageData {
  stats: ExpenseStat[];
  personalExpenses: Expense[];
  visaExpenses: Expense[];
  alertMessage?: string;
  alertDate?: string;
}

export interface ExpenseDetailsData {
  expense: Expense;
  receipt: {
    vendor: string;
    taxId: string;
    date: string;
    employee: string;
    poNumber: string;
    jobNumber: string;
    type: string;
    subtotal: number;
    tax: number;
    total: number;
  };
  timeline: {
    status: ExpenseStatus;
    label: string;
    description: string;
    date?: string;
    by?: string;
  }[];
}