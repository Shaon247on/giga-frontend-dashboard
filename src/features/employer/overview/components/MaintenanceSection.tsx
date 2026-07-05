"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "./SectionHeader";
import type { MaintenanceItem } from "../types";

interface MaintenanceSectionProps {
  items: MaintenanceItem[];
}

export function MaintenanceSection({ items }: MaintenanceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionHeader
          icon={Wrench}
          title="Maintenance"
          count={items.length}
          countLabel="issues"
          seeAllHref="/employer/overview/vehicle-reports"
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {isExpanded && (
        <div className="px-4 py-3 space-y-3 max-h-65 overflow-y-auto">
          {items.slice(0, 4).map((item) => (
            <div key={item.id} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-primary-txt">
                  {item.vehicleLabel}
                </p>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-[12px] text-secondary-txt mt-0.5">{item.issue}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[11px] text-secondary-txt">
                  Reported by {item.reportedBy}
                </span>
                <span className="text-[11px] text-secondary-txt">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-[13px] text-secondary-txt py-4">No maintenance issues</p>
          )}
        </div>
      )}
    </div>
  );
}