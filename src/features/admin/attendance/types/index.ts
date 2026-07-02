import type { Status, AttendanceStatus, TimeOffStatus, TimeOffType, AttendanceFilter, TimeOffFilter } from "@/types";

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  location: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  hours: number;
  status: AttendanceStatus;
}

export interface TimeOffRequest {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  type: TimeOffType;
  startDate: string;
  endDate: string;
  reason: string;
  status: TimeOffStatus;
}

export interface AttendancePageData {
  attendanceRecords: AttendanceRecord[];
  timeOffRequests: TimeOffRequest[];
}