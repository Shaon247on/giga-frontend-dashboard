import { cn } from "@/lib/utils";
import type { Status } from "@/types";

const STATUS_STYLES: Record<Status, { label: string; classes: string; dot: string }> = {
  // ── General ──
  active: {
    label: "Active",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },
  inactive: {
    label: "Inactive",
    classes: "bg-slate-50 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },

  // ── Review States ──
  reviewed: {
    label: "Reviewed",
    classes: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    classes: "bg-amber-50 text-amber-600 border-amber-200",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Approved",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
  flagged: {
    label: "Flagged",
    classes: "bg-orange-50 text-orange-600 border-orange-200",
    dot: "bg-orange-400",
  },

  // ── Progress States ──
  open: {
    label: "Open",
    classes: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-amber-50 text-amber-600 border-amber-200",
    dot: "bg-amber-400",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },

  // ── Vehicle ──
  maintenance: {
    label: "Maintenance",
    classes: "bg-orange-50 text-orange-600 border-orange-200",
    dot: "bg-orange-400",
  },

  // ── Expense ──
  paid: {
    label: "Paid",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },
  submitted: {
    label: "Submitted",
    classes: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
  "under-review": {
    label: "Under Review",
    classes: "bg-amber-50 text-amber-600 border-amber-200",
    dot: "bg-amber-400",
  },
  reimbursed: {
    label: "Reimbursed",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },

  // ── Time Off ──
  denied: {
    label: "Denied",
    classes: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_STYLES[status];

  // Fallback for unknown status
  if (!config) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
          "bg-slate-50 text-slate-600 border-slate-200",
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
        {status}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
        config.classes,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  );
}