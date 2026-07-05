import type { PunchReportsPageData, TimeOffRequest } from "../types";

export const MOCK_TIME_OFF_REQUESTS: TimeOffRequest[] = [
  {
    id: "t1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    type: "Vacation",
    dateRange: "2026-06-20 — 2026-06-27 (return 2026-06-30)",
    reason: "Family trip",
    status: "pending",
  },
  {
    id: "t2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    type: "Sick Day",
    dateRange: "2026-06-03",
    reason: "Flu",
    status: "reviewed",
  },
  {
    id: "t3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    type: "Vacation",
    dateRange: "2026-07-14 — 2026-07-18 (return 2026-07-21)",
    reason: null,
    status: "approved",
  },
  {
    id: "t4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    type: "Sick Day",
    dateRange: "2026-05-28",
    reason: "Medical appointment",
    status: "reviewed",
  },
  {
    id: "t5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    type: "Vacation",
    dateRange: "2026-08-04 — 2026-08-08 (return 2026-08-11)",
    reason: "Personal",
    status: "denied",
  },
  {
    id: "t6",
    employeeName: "Sandra Kim",
    initials: "SK",
    avatarColor: "#4F46E5",
    type: "Vacation",
    dateRange: "2026-07-01 — 2026-07-05 (return 2026-07-08)",
    reason: "Family reunion",
    status: "pending",
  },
  {
    id: "t7",
    employeeName: "Diane Patel",
    initials: "DP",
    avatarColor: "#1E3A5F",
    type: "Sick Day",
    dateRange: "2026-06-10",
    reason: "Migraine",
    status: "approved",
  },
];

export const MOCK_PUNCH_REPORTS_DATA: PunchReportsPageData = {
  requests: MOCK_TIME_OFF_REQUESTS,
  totalCount: 7,
  statusCounts: {
    pending: 2,
    approved: 2,
    denied: 1,
  },
};

export async function fetchPunchReportsData(): Promise<PunchReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_PUNCH_REPORTS_DATA;
}