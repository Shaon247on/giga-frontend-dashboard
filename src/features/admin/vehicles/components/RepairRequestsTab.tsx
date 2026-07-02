"use client";

import { StatusBadge } from "@/components/shared/StatusBadge";
import type { RepairRequest } from "../types";

interface RepairRequestsTabProps {
  data: RepairRequest[];
}

export function RepairRequestsTab({ data }: RepairRequestsTabProps) {
  return (
    <div className="space-y-3">
      {data.map((request) => (
        <div
          key={request.id}
          className="flex items-start justify-between p-4 rounded-xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Left side - Content */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: request.requesterColor }}
            >
              <span className="text-[11px] font-bold text-white">
                {request.requesterInitials}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-semibold text-primary-txt leading-tight">
                {request.title}
              </h4>
              <p className="text-[12px] text-secondary-txt mt-0.5 leading-snug">
                {request.subtitle}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[11px] text-secondary-txt">
                  Requester: <span className="font-medium text-primary-txt">{request.requester}</span>
                </span>
                <span className="text-[11px] text-secondary-txt">
                  Requested: <span className="font-medium text-primary-txt">{request.requestDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Status */}
          <div className="shrink-0 ml-4">
            <StatusBadge status={request.status} />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-secondary-txt">
          No repair requests found
        </div>
      )}
    </div>
  );
}