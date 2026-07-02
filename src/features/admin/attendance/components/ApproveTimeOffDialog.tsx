"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { TimeOffRequest } from "../types";

interface ApproveTimeOffDialogProps {
  request: TimeOffRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (request: TimeOffRequest) => void;
}

export function ApproveTimeOffDialog({
  request,
  open,
  onOpenChange,
  onConfirm,
}: ApproveTimeOffDialogProps) {
  const [loading, setLoading] = useState(false);

  if (!request) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onConfirm(request);
    } catch (error) {
      console.error("Failed to approve request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-105 rounded-2xl">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
          <DialogTitle className="text-[17px] font-bold text-primary-txt">
            Approve Time Off
          </DialogTitle>
          <DialogDescription className="text-[13px] text-secondary-txt">
            Are you sure you want to approve this time off request for{" "}
            <span className="font-semibold text-primary-txt">
              {request.employeeName}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-slate-50/80 rounded-xl p-4 space-y-2 border border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-txt">Type:</span>
            <span className="font-medium text-primary-txt capitalize">
              {request.type}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-txt">Duration:</span>
            <span className="font-medium text-primary-txt">
              {request.startDate} — {request.endDate}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-txt">Reason:</span>
            <span className="font-medium text-primary-txt text-right max-w-50 truncate">
              {request.reason}
            </span>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full sm:w-auto bg-btn-accept text-white hover:brightness-90"
          >
            {loading ? "Approving..." : "Approve Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}