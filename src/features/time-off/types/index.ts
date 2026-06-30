import type { Status } from "@/types";

// ── Filter tabs ──────────────────────────────────────────
export type TimeOffFilter = "all" | "vacation" | "sick-days";

export interface TimeOffFilterTab {
  value: TimeOffFilter;
  label: string;
}

// ── Request type ─────────────────────────────────────────
export type RequestType = "vacation" | "sick-day";
export type CoverageRisk = "low" | "medium" | "high";

// ── Time off request ─────────────────────────────────────
export interface TimeOffRequest {
  id: string;
  employeeName: string;
  initials: string;
  avatarColor: string;
  requestType: RequestType;
  startDate: string;        // "2026-06-20"
  returnDate: string | null; // null for single-day sick days
  reason: string;
  coverageRisk: CoverageRisk;
  status: Status; // pending | reviewed | approved | rejected
  supervisorNote?: string;
}

// ── Stat cards ────────────────────────────────────────────
export interface TimeOffStatCard {
  id: string;
  count: number;
  label: string;
  iconVariant: "awaiting" | "approved" | "denied";
}

// ── Page data shape ──────────────────────────────────────
export interface TimeOffPageData {
  statCards: TimeOffStatCard[];
  requests: TimeOffRequest[];
  filterTabs: TimeOffFilterTab[];
}

// ── Review action payloads ───────────────────────────────
export interface ApproveRequestInput {
  requestId: string;
  supervisorNote?: string;
}

export interface RejectRequestInput {
  requestId: string;
  reason: string; // required
}