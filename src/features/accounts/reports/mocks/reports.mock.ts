import type { ReportsPageData, DailyReportData, MonthlyReportData, BookkeepingExport, ReportItem } from "../types";

export const MOCK_PREVIEW_ITEMS: ReportItem[] = [
  {
    employee: "Marcus Rivera",
    amount: 48.50,
    tax: 6.31,
    po: "PO-2411",
    job: "Job #1082",
    type: "Direct",
    status: "pending",
  },
  {
    employee: "Ethan Brooks",
    amount: 315.40,
    tax: 41.00,
    po: "PO-2415",
    job: "Job #1088",
    type: "Direct",
    status: "reviewed",
  },
  {
    employee: "Priya Sharma",
    amount: 87.25,
    tax: 11.34,
    po: "PO-2401",
    job: "Job #1080",
    type: "Shop",
    status: "pending",
  },
];

export const MOCK_DAILY_DATA: DailyReportData = {
  date: "2026-06-03",
  submissions: 3,
  total: 451.15,
  items: MOCK_PREVIEW_ITEMS,
};

export const MOCK_MONTHLY_DATA: MonthlyReportData = {
  month: "June",
  year: "2026",
  submissions: 5,
  total: 813.15,
};

export const MOCK_EXPORTS: BookkeepingExport[] = [
  {
    id: "1",
    title: "All Expenses",
    subtitle: "June 2026",
    fileType: "CSV",
    amount: 813.15,
  },
  {
    id: "2",
    title: "Personal Only",
    subtitle: "June 2026",
    fileType: "CSV",
    amount: 258.75,
  },
  {
    id: "3",
    title: "Visa Only",
    subtitle: "June 2026",
    fileType: "CSV",
    amount: 555.40,
  },
  {
    id: "4",
    title: "Full Year",
    subtitle: "2026",
    fileType: "XLSX",
    amount: 4210.00,
  },
];

export const MOCK_REPORTS_PAGE_DATA: ReportsPageData = {
  dailyData: MOCK_DAILY_DATA,
  monthlyData: MOCK_MONTHLY_DATA,
  exports: MOCK_EXPORTS,
  previewItems: MOCK_PREVIEW_ITEMS,
};

export async function fetchReportsPageData(): Promise<ReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_REPORTS_PAGE_DATA;
}