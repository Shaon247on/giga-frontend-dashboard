import type { AttendancePageData, AttendanceRecord } from "../types";

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: "emp-1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#8B5CF6",
    location: "Ottawa Shop",
    date: "2026-06-04",
    clockIn: "07:02",
    clockOut: "15:34",
    hours: 8.53,
    type: "regular",
    status: "reviewed",
  },
  {
    id: "emp-2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#3B82F6",
    location: "Toronto Shop",
    date: "2026-06-04",
    clockIn: "07:15",
    clockOut: "",
    hours: 0,
    type: "regular",
    status: "active",
  },
  {
    id: "emp-3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#10B981",
    location: "Hamilton Shop",
    date: "2026-06-04",
    clockIn: "08:00",
    clockOut: "16:10",
    hours: 8.17,
    type: "regular",
    status: "reviewed",
  },
  {
    id: "emp-4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#F59E0B",
    location: "Out of Town — Project Alpha",
    date: "2026-06-04",
    clockIn: "06:45",
    clockOut: "17:00",
    hours: 10.25,
    type: "out-of-town",
    status: "pending",
  },
  {
    id: "emp-5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#06B6D4",
    location: "Ottawa Shop",
    date: "2026-06-03",
    clockIn: "07:30",
    clockOut: "16:00",
    hours: 8.5,
    type: "manual",
    status: "pending",
  },
];

export const MOCK_ATTENDANCE_PAGE_DATA: AttendancePageData = {
  statCards: [
    { id: "pending", count: 2, label: "Pending Review", iconVariant: "pending" },
    { id: "manual", count: 1, label: "Manual Entries", iconVariant: "manual" },
    { id: "active", count: 1, label: "Currently Active", iconVariant: "active" },
  ],
  filterTabs: [
    { value: "all", label: "All Records" },
    { value: "pending-review", label: "Pending Review", badge: 2 },
    { value: "manual-entry", label: "Manual Entry" },
    { value: "out-of-town", label: "Out of Town" },
  ],
  records: MOCK_ATTENDANCE_RECORDS,
};

// Simulated async API calls
export async function fetchAttendancePageData(): Promise<AttendancePageData> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_ATTENDANCE_PAGE_DATA;
}

export async function fetchAttendanceRecord(id: string): Promise<AttendanceRecord | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_ATTENDANCE_RECORDS.find((r) => r.id === id) ?? null;
}