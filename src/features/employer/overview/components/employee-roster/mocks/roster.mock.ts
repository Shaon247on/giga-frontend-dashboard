import type { RosterPageData, RosterEmployee } from "../types";

export const MOCK_ROSTER_EMPLOYEES: RosterEmployee[] = [
  {
    id: "e1",
    name: "Marcus Rivera",
    initials: "MR",
    avatarColor: "#1E3A5F",
    role: "Employee",
    email: "marcus@fieldops.com",
    vehicle: "Van #12 — Ford Transit 2022",
    todayPunch: "07:02 — 15:34 · 8.5 hrs",
    isActive: true,
  },
  {
    id: "e2",
    name: "James Nguyen",
    initials: "JN",
    avatarColor: "#0F172B",
    role: "Employee",
    email: "james@fieldops.com",
    vehicle: "Van #07 — Ford Transit 2021",
    todayPunch: "07:15 — Active",
    isActive: true,
  },
  {
    id: "e3",
    name: "Ethan Brooks",
    initials: "EB",
    avatarColor: "#1E40AF",
    role: "Employee",
    email: "ethan@fieldops.com",
    vehicle: "Van #19 — Ram ProMaster 2023",
    todayPunch: "08:00 — 16:10 · 8.2 hrs",
    isActive: true,
  },
  {
    id: "e4",
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "#6D28D9",
    role: "Employee",
    email: "priya@fieldops.com",
    vehicle: "Van #03 — Ford Transit 2020",
    todayPunch: "06:45 — 17:00 · 10.25 hrs",
    isActive: true,
  },
  {
    id: "e5",
    name: "Carlos Vega",
    initials: "CV",
    avatarColor: "#065F46",
    role: "Employee",
    email: "carlos@fieldops.com",
    vehicle: "Van #22 — Mercedes Sprinter 2022",
    todayPunch: null,
    isActive: true,
  },
  {
    id: "e6",
    name: "Sandra Kim",
    initials: "SK",
    avatarColor: "#4F46E5",
    role: "Supervisor",
    email: "sandra@fieldops.com",
    vehicle: null,
    todayPunch: null,
    isActive: true,
  },
  {
    id: "e7",
    name: "Diane Patel",
    initials: "DP",
    avatarColor: "#1E3A5F",
    role: "Admin",
    email: "diane@fieldops.com",
    vehicle: null,
    todayPunch: null,
    isActive: true,
  },
];

export const MOCK_ROSTER_PAGE_DATA: RosterPageData = {
  employees: MOCK_ROSTER_EMPLOYEES,
  totalCount: 7,
  roleCounts: {
    employee: 5,
    supervisor: 1,
    admin: 1,
    accounting: 0,
  },
};

export async function fetchRosterPageData(): Promise<RosterPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_ROSTER_PAGE_DATA;
}