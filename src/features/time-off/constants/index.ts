import type { RequestType, CoverageRisk } from "../types";

export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  vacation: "Vacation",
  "sick-day": "Sick Day",
};

export const COVERAGE_RISK_LABELS: Record<CoverageRisk, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const COVERAGE_RISK_STYLES: Record<CoverageRisk, string> = {
  low: "text-emerald-600",
  medium: "text-amber-600",
  high: "text-red-600",
};

export const REQUEST_TYPE_BADGE_STYLES: Record<RequestType, string> = {
  vacation: "bg-violet-50 text-violet-600 border-violet-200",
  "sick-day": "bg-blue-50 text-blue-600 border-blue-200",
};