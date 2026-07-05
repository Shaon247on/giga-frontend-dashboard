import type { Status } from "@/types";

export type TimeOffStatus = Extract<Status, "pending" | "approved" | "denied" | "reviewed">;
export type TimeOffType = "Vacation" | "Sick Day";

export interface TimeOffRequest {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  type: TimeOffType;
  dateRange: string;
  reason: string | null;
  status: TimeOffStatus;
}

export interface PunchReportsPageData {
  requests: TimeOffRequest[];
  totalCount: number;
  statusCounts: {
    pending: number;
    approved: number;
    denied: number;
  };
}