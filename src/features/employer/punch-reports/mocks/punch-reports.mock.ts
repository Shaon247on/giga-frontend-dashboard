import type { PunchReportsPageData, PunchRecord } from "../types";

export const MOCK_PUNCH_RECORDS: PunchRecord[] = [
  {
    id: "p1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    date: "2026-06-04",
    location: "Ottawa Shop",
    clockIn: "07:02",
    clockOut: "15:34",
    hours: 8.5,
    type: "Shop",
    status: "reviewed",
  },
  {
    id: "p2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    date: "2026-06-04",
    location: "Toronto Shop",
    clockIn: "07:15",
    clockOut: null,
    hours: null,
    type: "Shop",
    status: "active",
  },
  {
    id: "p3",
    employeeName: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    date: "2026-06-04",
    location: "Hamilton Shop",
    clockIn: "08:00",
    clockOut: "16:10",
    hours: 8.2,
    type: "Shop",
    status: "reviewed",
  },
  {
    id: "p4",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    date: "2026-06-04",
    location: "Out of Town — Project Alpha",
    clockIn: "06:45",
    clockOut: "17:00",
    hours: 10.25,
    type: "Out-Of-Town",
    status: "pending",
  },
  {
    id: "p5",
    employeeName: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    date: "2026-06-03",
    location: "Ottawa Shop",
    clockIn: "07:30",
    clockOut: "16:00",
    hours: 8.5,
    type: "Manual",
    status: "pending",
  },
  {
    id: "p6",
    employeeName: "Sandra Kim",
    initials: "SK",
    avatarColor: "#4F46E5",
    date: "2026-06-04",
    location: "Vancouver Shop",
    clockIn: "08:15",
    clockOut: "16:45",
    hours: 8.5,
    type: "Shop",
    status: "reviewed",
  },
];

export const MOCK_PUNCH_REPORTS_DATA: PunchReportsPageData = {
  records: MOCK_PUNCH_RECORDS,
  totalCount: MOCK_PUNCH_RECORDS.length,
  summary: {
    totalHours: 35.5,
    activeNow: 1,
    pendingReview: 2,
  },
  shopHours: [
    { shop: "Barrie", hours: 12.5 },
    { shop: "Hamilton", hours: 16.7 },
    { shop: "Edmonton", hours: 0 },
    { shop: "Vancouver", hours: 6.3 },
  ],
};

export async function fetchPunchReportsData(): Promise<PunchReportsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_PUNCH_REPORTS_DATA;
}