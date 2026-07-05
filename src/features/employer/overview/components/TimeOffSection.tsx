"use client";

import { useState } from "react";
import { CalendarOff, CheckCircle, Clock, XCircle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "./SectionHeader";
import type { TimeOffRequest, TimeOffSummary } from "../types";
import { cn } from "@/lib/utils";

interface TimeOffSectionProps {
  requests: TimeOffRequest[];
  summary: TimeOffSummary;
}

export function TimeOffSection({ requests, summary }: TimeOffSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const summaryItems = [
    { label: "Pending", value: summary.pending, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Approved", value: summary.approved, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Denied", value: summary.denied, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionHeader
          icon={CalendarOff}
          title="Time Off"
          count={requests.length}
          countLabel="requests"
          seeAllHref="/employer/overview/punch-reports"
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {isExpanded && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 px-4 pt-4">
            {summaryItems.map((item) => (
              <div key={item.label} className={cn("rounded-xl p-3 text-center", item.bg)}>
                <p className="text-xl font-bold text-primary-txt">{item.value}</p>
                <p className="text-[10px] font-semibold text-secondary-txt uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Requests List */}
          <div className="px-4 py-3 space-y-3 max-h-65 overflow-y-auto">
            {requests.slice(0, 4).map((request) => (
              <div key={request.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: request.avatarColor }}
                >
                  <span className="text-[10px] font-bold text-white">{request.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-primary-txt truncate">
                      {request.employeeName}
                    </p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="text-[11px] text-secondary-txt mt-0.5">
                    {request.type} • {request.dateRange}
                  </p>
                  {request.reason && (
                    <p className="text-[11px] text-secondary-txt/70 mt-0.5 truncate">
                      {request.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <p className="text-center text-[13px] text-secondary-txt py-4">No time off requests</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}