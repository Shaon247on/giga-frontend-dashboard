import type { ExpenseStatus } from "@/types";



export interface VisaExpense {
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
  jobType: string;
  cardEnding: string;
  receiptId: string;
  status: ExpenseStatus;
  paidDate?: string | null;
  rejectionReason?: string | null;
}

export interface VisaDetailsData {
  expense: VisaExpense;
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
    cardEnding: string;
  };
}

export interface VisaPageData {
  expenses: VisaExpense[];
  totalCount: number;
}