import type { AttendanceFilter } from "../types";
import type { Status } from "@/types";

export const FILTER_TO_STATUS: Partial<Record<AttendanceFilter, Status[]>> = {
  "pending-review": ["pending"],
  "manual-entry":   ["pending", "reviewed", "flagged"],
  "out-of-town":    ["pending", "reviewed", "active"],
};

export const PUNCH_TYPE_LABELS = {
  regular:     "Regular",
  manual:      "Manual Entry",
  "out-of-town": "Out-Of-Town",
} as const;