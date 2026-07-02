import type { ExpensePageData, Expense, ExpenseStat, ExpenseDetailsData } from "../types";

export const MOCK_PERSONAL_EXPENSES: Expense[] = [
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
    type: "personal",
    status: "pending",
    receiptId: "EX1",
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
    type: "personal",
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
    type: "personal",
    status: "pending",
    receiptId: "EX3",
  },
];

export const MOCK_VISA_EXPENSES: Expense[] = [
  {
    id: "4",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#10B981",
    date: "2026-06-04",
    amount: 315.40,
    tax: 41.00,
    total: 356.40,
    poNumber: "PO-2415",
    jobNumber: "Job #1088",
    type: "visa",
    status: "reviewed",
    receiptId: "VX1",
  },
  {
    id: "5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#06B6D4",
    date: "2026-05-30",
    amount: 240.00,
    tax: 31.20,
    total: 271.20,
    poNumber: "PO-2395",
    jobNumber: "Job #1071",
    type: "visa",
    status: "reviewed",
    receiptId: "VX2",
  },
];

export const MOCK_EXPENSE_STATS: ExpenseStat[] = [
  {
    label: "Pending",
    count: 2,
    amount: 0,
    icon: "pending",
  },
  {
    label: "Reviewed",
    count: 2,
    amount: 0,
    icon: "reviewed",
  },
  {
    label: "Paid",
    count: 1,
    amount: 0,
    icon: "paid",
  },
  {
    label: "Total Amount",
    count: 0,
    amount: 813.00,
    icon: "total",
  },
];

export const MOCK_EXPENSE_PAGE_DATA: ExpensePageData = {
  stats: MOCK_EXPENSE_STATS,
  personalExpenses: MOCK_PERSONAL_EXPENSES,
  visaExpenses: MOCK_VISA_EXPENSES,
  alertMessage: "2 personal expenses from yesterday are awaiting review.",
  alertDate: "Jun 9, 2026",
};

export const MOCK_EXPENSE_DETAILS: ExpenseDetailsData = {
  expense: MOCK_PERSONAL_EXPENSES[0],
  receipt: {
    vendor: "Ottawa Supplies Co.",
    taxId: "843-221-09",
    date: "2026-06-03",
    employee: "Marcus Rivera",
    poNumber: "PO-2411",
    jobNumber: "Job #1082",
    type: "Direct",
    subtotal: 48.50,
    tax: 6.31,
    total: 54.81,
  },
  timeline: [
    {
      status: "submitted",
      label: "Submitted",
      description: "By Marcus Rivera on 2026-06-03",
      date: "2026-06-03",
      by: "Marcus Rivera",
    },
    {
      status: "under-review",
      label: "Under Review",
      description: "Admin review in progress",
    },
    {
      status: "reviewed",
      label: "Reviewed",
      description: "Expense verified and matched",
    },
    {
      status: "paid",
      label: "Payment Sent",
      description: "Pending transfer",
    },
  ],
};

export async function fetchExpensesPageData(): Promise<ExpensePageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_EXPENSE_PAGE_DATA;
}

export async function fetchExpenseDetails(id: string): Promise<ExpenseDetailsData | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const expense = [...MOCK_PERSONAL_EXPENSES, ...MOCK_VISA_EXPENSES].find((e) => e.id === id);
  if (!expense) return null;
  return {
    ...MOCK_EXPENSE_DETAILS,
    expense: expense,
    receipt: {
      ...MOCK_EXPENSE_DETAILS.receipt,
      employee: expense.employeeName,
      poNumber: expense.poNumber,
      jobNumber: expense.jobNumber,
      subtotal: expense.amount,
      tax: expense.tax,
      total: expense.total,
    },
  };
}