import type { TimeOffPageData, TimeOffRequest } from "../types";

export const MOCK_TIME_OFF_REQUESTS: TimeOffRequest[] = [
  {
    id: "req-1",
    employeeName: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#8B5CF6",
    requestType: "vacation",
    startDate: "2026-06-20",
    returnDate: "2026-06-30",
    reason: "Family trip",
    coverageRisk: "medium",
    status: "pending",
  },
  {
    id: "req-2",
    employeeName: "James Nguyen",
    initials: "JN",
    avatarColor: "#3B82F6",
    requestType: "sick-day",
    startDate: "2026-06-03",
    returnDate: null,
    reason: "Flu",
    coverageRisk: "low",
    status: "approved",
  },
  {
    id: "req-3",
    employeeName: "Priya Sharma",
    initials: "PS",
    avatarColor: "#F59E0B",
    requestType: "sick-day",
    startDate: "2026-05-28",
    returnDate: null,
    reason: "Medical appointment",
    coverageRisk: "low",
    status: "pending",
  },
];

export const MOCK_TIME_OFF_PAGE_DATA: TimeOffPageData = {
  statCards: [
    { id: "awaiting", count: 2, label: "Awaiting Action", iconVariant: "awaiting" },
    { id: "approved", count: 1, label: "Approved", iconVariant: "approved" },
    { id: "denied", count: 0, label: "Denied", iconVariant: "denied" },
  ],
  filterTabs: [
    { value: "all", label: "All Requests" },
    { value: "vacation", label: "Vacation" },
    { value: "sick-days", label: "Sick Days" },
  ],
  requests: MOCK_TIME_OFF_REQUESTS,
};

// ── Simulated async API calls ────────────────────────────
export async function fetchTimeOffPageData(): Promise<TimeOffPageData> {
  await new Promise((r) => setTimeout(r, 250));
  return MOCK_TIME_OFF_PAGE_DATA;
}

export async function fetchTimeOffRequest(id: string): Promise<TimeOffRequest | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_TIME_OFF_REQUESTS.find((r) => r.id === id) ?? null;
}

// Mutation mocks — simulate backend approve/reject
export async function approveTimeOffRequest(requestId: string, supervisorNote?: string) {
  await new Promise((r) => setTimeout(r, 400));
  console.log("[mock] approved", requestId, supervisorNote);
  return { success: true };
}

export async function rejectTimeOffRequest(requestId: string, reason: string) {
  await new Promise((r) => setTimeout(r, 400));
  console.log("[mock] rejected", requestId, reason);
  return { success: true };
}