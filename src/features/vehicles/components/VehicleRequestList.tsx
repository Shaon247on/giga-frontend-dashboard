"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Car, ChevronRight, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VEHICLE_ICON_BG, VEHICLE_ICON_COLOR } from "../constants";
import type { MaintenanceRequest } from "../types";

interface VehicleRequestListProps {
  requests: MaintenanceRequest[];
  selectedId: string | null;
}

export function VehicleRequestList({ requests, selectedId }: VehicleRequestListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === selectedId) {
        params.delete("vehicle");
      } else {
        params.set("vehicle", id);
      }
      router.replace(`/dashboard/vehicles?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, selectedId]
  );

  return (
    <div className="space-y-3">
      <p className="text-[13px] font-semibold text-primary-txt pl-1">
        {requests.length} request{requests.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-3">
        {requests.map((request) => {
          const isSelected = request.id === selectedId;

          return (
            <div
              key={request.id}
              onClick={() => handleSelect(request.id)}
              className={cn(
                "w-full text-left rounded-2xl bg-white border shadow-sm p-4",
                "transition-all duration-150 cursor-pointer",
                isSelected
                  ? "border-btn-primary ring-2 ring-btn-primary/15"
                  : "border-slate-200/60 hover:border-slate-300 hover:shadow-md"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Vehicle icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    VEHICLE_ICON_BG[request.status]
                  )}
                >
                  <Car className={cn("w-5 h-5", VEHICLE_ICON_COLOR[request.status])} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[14px] font-bold text-primary-txt leading-tight">
                      {request.vehicleLabel}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={request.status} />
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isSelected ? "text-btn-primary" : "text-slate-300"
                        )}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <p className="text-[13px] font-medium text-primary-txt mt-1.5 leading-snug">
                    {request.issue}
                  </p>

                  <div className="flex items-center gap-4 mt-2.5">
                    <span className="flex items-center gap-1.5 text-[12px] text-secondary-txt">
                      <User className="w-3 h-3" strokeWidth={1.8} />
                      {request.reportedBy}
                    </span>
                    <span className="flex items-center gap-1.5 text-[12px] text-secondary-txt">
                      <Calendar className="w-3 h-3" strokeWidth={1.8} />
                      {request.reportedDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {requests.length === 0 && (
        <div className="rounded-2xl bg-white border border-slate-200/60 p-10 text-center">
          <p className="text-sm text-secondary-txt">No maintenance requests.</p>
        </div>
      )}
    </div>
  );
}