import type { VisaExpense, VisaPageData, VisaDetailsData } from "../types";

export const MOCK_VISA_EXPENSES: VisaExpense[] = [
  {
    id: "1",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#10B981",
    date: "2026-06-04",
    amount: 315.40,
    tax: 41.00,
    total: 356.40,
    poNumber: "PO-2415",
    jobNumber: "Job #1088",
    jobType: "Direct",
    cardEnding: "1842",
    receiptId: "EX3",
    status: "pending",
    paidDate: null,
    rejectionReason: null,
  },
  {
    id: "2",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#06B6D4",
    date: "2026-05-30",
    amount: 240.00,
    tax: 31.20,
    total: 271.20,
    poNumber: "PO-2395",
    jobNumber: "Job #1071",
    jobType: "Shop",
    cardEnding: "1842",
    receiptId: "VX2",
    status: "pending",
    paidDate: null,
    rejectionReason: null,
  },
  {
    id: "3",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#8B5CF6",
    date: "2026-05-28",
    amount: 125.50,
    tax: 16.32,
    total: 141.82,
    poNumber: "PO-2389",
    jobNumber: "Job #1068",
    jobType: "Direct",
    cardEnding: "1842",
    receiptId: "VX3",
    status: "reviewed",
    paidDate: "2026-05-30",
    rejectionReason: null,
  },
];

export const MOCK_VISA_DETAILS: VisaDetailsData = {
  expense: MOCK_VISA_EXPENSES[0],
  receipt: {
    vendor: "Ottawa Supplies Co.",
    taxId: "843-221-09",
    date: "2026-06-04",
    employee: "Ethan Brooks",
    poNumber: "PO-2415",
    jobNumber: "Job #1088",
    jobType: "Direct",
    subtotal: 315.40,
    tax: 41.00,
    total: 356.40,
    cardEnding: "1842",
  },
};

export async function fetchVisaPageData(): Promise<VisaPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    expenses: MOCK_VISA_EXPENSES,
    totalCount: MOCK_VISA_EXPENSES.length,
  };
}

export async function fetchVisaDetails(id: string): Promise<VisaDetailsData | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const expense = MOCK_VISA_EXPENSES.find((e) => e.id === id);
  if (!expense) return null;
  return {
    ...MOCK_VISA_DETAILS,
    expense: expense,
    receipt: {
      ...MOCK_VISA_DETAILS.receipt,
      employee: expense.employeeName,
      poNumber: expense.poNumber,
      jobNumber: expense.jobNumber,
      subtotal: expense.amount,
      tax: expense.tax,
      total: expense.total,
    },
  };
}