"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { TimeOffRequest } from "../types";

interface ViewTimeOffDialogProps {
  request: TimeOffRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTimeOffDialog({ request, open, onOpenChange }: ViewTimeOffDialogProps) {
  if (!request) return null;

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      vacation: "Vacation",
      sick: "Sick Leave",
      personal: "Personal",
      other: "Other",
    };
    return map[type] || type;
  };

  const infoFields = [
    { label: "Employee", value: request.employeeName },
    { label: "Type", value: getTypeLabel(request.type) },
    { label: "Start Date", value: request.startDate },
    { label: "End Date", value: request.endDate },
    { label: "Status", value: <StatusBadge status={request.status} /> },
    { label: "Reason", value: request.reason, fullWidth: true },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[17px] font-bold text-primary-txt">
            Time Off Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Employee Info */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: request.avatarColor }}
            >
              <span className="text-[12px] font-bold text-white">
                {request.initials}
              </span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-primary-txt">
                {request.employeeName}
              </p>
              <p className="text-[12px] text-secondary-txt">
                Request ID: #{request.id}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            {infoFields.map((field, index) => {
              if (field.fullWidth) {
                return (
                  <div key={index} className="col-span-2">
                    <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                      {field.label}
                    </p>
                    <div className="text-[14px] text-primary-txt mt-1 leading-relaxed">
                      {field.value}
                    </div>
                  </div>
                );
              }
              return (
                <div key={index}>
                  <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                    {field.label}
                  </p>
                  <div className="text-[14px] text-primary-txt mt-1">
                    {field.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}