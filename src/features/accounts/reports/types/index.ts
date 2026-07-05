import type { Status } from "@/types";

export interface DailyReportData {
  date: string;
  submissions: number;
  total: number;
  items: ReportItem[];
}

export interface MonthlyReportData {
  month: string;
  year: string;
  submissions: number;
  total: number;
}

export interface ReportItem {
  employee: string;
  amount: number;
  tax: number;
  po: string;
  job: string;
  type: string;
  status: Status;
}

export interface BookkeepingExport {
  id: string;
  title: string;
  subtitle: string;
  fileType: string;
  amount: number;
}

export interface ReportsPageData {
  dailyData: DailyReportData;
  monthlyData: MonthlyReportData;
  exports: BookkeepingExport[];
  previewItems: ReportItem[];
}