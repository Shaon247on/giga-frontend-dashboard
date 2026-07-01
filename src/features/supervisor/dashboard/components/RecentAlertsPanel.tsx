import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecentAlert, AlertSeverity } from "../types";

// Dot color per severity
const SEVERITY_DOT: Record<AlertSeverity, string> = {
  warning: "bg-amber-400",
  error: "bg-red-500",
  info: "bg-blue-500",
  pending: "bg-amber-400",
};

// Card bg tint per severity
const SEVERITY_BG: Record<AlertSeverity, string> = {
  warning: "bg-amber-50/60 border-amber-100",
  error: "bg-red-50/60 border-red-100",
  info: "bg-blue-50/60 border-blue-100",
  pending: "bg-amber-50/60 border-amber-100",
};

interface RecentAlertsPanelProps {
  alerts: RecentAlert[];
  newCount: number;
}

export function RecentAlertsPanel({ alerts, newCount }: RecentAlertsPanelProps) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-card border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" strokeWidth={2} />
          <h2 className="text-[14px] font-semibold text-[#0F172B]">Recent Alerts</h2>
        </div>
        {newCount > 0 && (
          <span className="text-xs font-medium text-[#667085]">
            {newCount} new
          </span>
        )}
      </div>

      {/* Alert list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3.5 rounded-xl border",
              "transition-colors duration-150 cursor-pointer hover:brightness-95",
              SEVERITY_BG[alert.severity]
            )}
          >
            {/* Severity dot */}
            <span
              className={cn(
                "mt-1.5 w-2 h-2 rounded-full shrink-0",
                SEVERITY_DOT[alert.severity]
              )}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#0F172B] leading-snug">
                  {alert.title}
                </p>z
                <span className="text-[11px] text-[#90A1B9] shrink-0 mt-0.5">
                  {alert.timeAgo}
                </span>
              </div>
              <p className="text-[12px] text-[#667085] mt-0.5 leading-tight">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}