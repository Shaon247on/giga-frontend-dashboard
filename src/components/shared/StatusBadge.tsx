import { cn } from "@/lib/utils";
import type { Status } from "@/types";

const STATUS_STYLES: Record<Status, { label: string; classes: string; dot: string }> = {
  active: {
    label: "Active",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },
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
  open: {
    label: "Open",
    classes: "bg-orange-50 text-orange-600 border-orange-200",
    dot: "bg-orange-400",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_STYLES[status];

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