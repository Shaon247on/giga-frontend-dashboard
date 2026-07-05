import type { AttendanceStatus } from "@/types";

export type PunchType = "Shop" | "Out-Of-Town" | "Manual";

export interface PunchRecord {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  date: string;
  location: string;
  clockIn: string;
  clockOut: string | null;
  hours: number | null;
  type: PunchType;
  status: AttendanceStatus;
}

export interface PunchReportsPageData {
  records: PunchRecord[];
  totalCount: number;
  summary: {
    totalHours: number;
    activeNow: number;
    pendingReview: number;
  };
  shopHours: {
    shop: string;
    hours: number;
  }[];
}