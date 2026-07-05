import type { AccountExpense, ExpensesPageData, ExpensePreviewData } from "../types";

export const MOCK_EXPENSES: AccountExpense[] = [
  {
    id: "1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#8B5CF6",
    date: "2026-06-03",
    amount: 48.50,
    tax: 6.31,
    total: 54.81,
    poNumber: "PO-2411",
    jobNumber: "Job #1082",
    type: "direct",
    status: "pending",
    receiptId: "EX1",
    paidDate: null,
  },
  {
    id: "2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#3B82F6",
    date: "2026-06-02",
    amount: 122.00,
    tax: 15.86,
    total: 137.86,
    poNumber: "PO-2398",
    jobNumber: "Job #1077",
    type: "shop",
    status: "paid",
    receiptId: "EX2",
    paidDate: "2026-06-05",
  },
  {
    id: "3",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#F59E0B",
    date: "2026-06-01",
    amount: 87.25,
    tax: 11.34,
    total: 98.59,
    poNumber: "PO-2401",
    jobNumber: "Job #1080",
    type: "direct",
    status: "rejected",
    receiptId: "EX3",
    paidDate: null,
  },
  {
    id: "4",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#10B981",
    date: "2026-05-30",
    amount: 215.40,
    tax: 28.00,
    total: 243.40,
    poNumber: "PO-2395",
    jobNumber: "Job #1075",
    type: "shop",
    status: "pending",
    receiptId: "EX4",
    paidDate: null,
  },
  {
    id: "5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#06B6D4",
    date: "2026-05-28",
    amount: 67.50,
    tax: 8.78,
    total: 76.28,
    poNumber: "PO-2389",
    jobNumber: "Job #1070",
    type: "direct",
    status: "paid",
    receiptId: "EX5",
    paidDate: "2026-05-31",
  },
];

export const MOCK_EXPENSE_PREVIEW: ExpensePreviewData = {
  expense: MOCK_EXPENSES[0],
  receipt: {
    vendor: "Ottawa Supplies Co.",
    taxId: "843-221-09",
    date: "2026-06-03",
    employee: "Marcus Rivera",
    poNumber: "PO-2411",
    jobNumber: "Job #1082",
    jobType: "Direct",
    subtotal: 48.50,
    tax: 6.31,
    total: 54.81,
  },
};

export async function fetchExpensesPageData(): Promise<ExpensesPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    expenses: MOCK_EXPENSES,
    totalCount: MOCK_EXPENSES.length,
  };
}

export async function fetchExpensePreview(id: string): Promise<ExpensePreviewData | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const expense = MOCK_EXPENSES.find((e) => e.id === id);
  if (!expense) return null;
  return {
    ...MOCK_EXPENSE_PREVIEW,
    expense: expense,
    receipt: {
      ...MOCK_EXPENSE_PREVIEW.receipt,
      employee: expense.employeeName,
      poNumber: expense.poNumber,
      jobNumber: expense.jobNumber,
      subtotal: expense.amount,
      tax: expense.tax,
      total: expense.total,
    },
  };
}