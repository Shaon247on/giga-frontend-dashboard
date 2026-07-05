import type { ExpenseReportsPageData, ExpenseReportItem } from "../types";

export const MOCK_EXPENSE_ITEMS: ExpenseReportItem[] = [
  {
    id: "x1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    date: "2026-06-03",
    type: "personal",
    poNumber: "PO-2411",
    jobNumber: "Job #1082",
    amount: 48.50,
    tax: 6.31,
    total: 54.81,
    status: "pending",
  },
  {
    id: "x2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    date: "2026-06-02",
    type: "personal",
    poNumber: "PO-2398",
    jobNumber: "Job #1077",
    amount: 122.00,
    tax: 15.86,
    total: 137.86,
    status: "paid",
  },
  {
    id: "x3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    date: "2026-06-04",
    type: "visa",
    poNumber: "PO-2415",
    jobNumber: "Job #1088",
    amount: 315.40,
    tax: 41.00,
    total: 356.40,
    status: "reviewed",
  },
  {
    id: "x4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    date: "2026-06-01",
    type: "personal",
    poNumber: "PO-2401",
    jobNumber: "Job #1080",
    amount: 87.25,
    tax: 11.34,
    total: 98.59,
    status: "pending",
  },
  {
    id: "x5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    date: "2026-05-30",
    type: "visa",
    poNumber: "PO-2395",
    jobNumber: "Job #1071",
    amount: 240.00,
    tax: 31.20,
    total: 271.20,
    status: "reviewed",
  },
];

export const MOCK_EXPENSE_REPORTS_DATA: ExpenseReportsPageData = {
  items: MOCK_EXPENSE_ITEMS,
  totalCount: MOCK_EXPENSE_ITEMS.length,
  summary: {
    grandTotal: 813.15,
    personalTotal: 257.75,
    visaTotal: 555.40,
    pendingTotal: 135.75,
  },
  breakdown: {
    personal: {
      percentage: 32,
      paid: 122.00,
    },
    visa: {
      percentage: 68,
      paid: 0,
    },
  },
};

export async function fetchExpenseReportsData(): Promise<ExpenseReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_EXPENSE_REPORTS_DATA;
}