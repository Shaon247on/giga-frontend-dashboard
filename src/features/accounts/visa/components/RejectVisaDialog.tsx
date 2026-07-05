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
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RejectVisaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  employeeName: string;
}

export function RejectVisaDialog({
  open,
  onOpenChange,
  onConfirm,
  employeeName,
}: RejectVisaDialogProps) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onConfirm(reason);
    } catch (error) {
      console.error("Failed to reject expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <X className="w-6 h-6 text-btn-reject" />
          </div>
          <DialogTitle className="text-[17px] font-bold text-primary-txt">
            Reject Visa Expense
          </DialogTitle>
          <DialogDescription className="text-[13px] text-secondary-txt">
            Please provide a reason for rejecting this Visa expense from{" "}
            <span className="font-semibold text-primary-txt">
              {employeeName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <label
            htmlFor="rejection-reason"
            className="text-[11px] font-semibold text-table-header uppercase tracking-wide"
          >
            Rejection Reason <span className="text-btn-reject">*</span>
          </label>
          <Textarea
            id="rejection-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please explain why this expense is being rejected..."
            className={cn(
              "min-h-[100px] resize-none",
              !reason.trim() && "border-btn-reject focus-visible:ring-btn-reject/20"
            )}
          />
          {!reason.trim() && (
            <p className="text-[11px] text-btn-reject">Reason is required</p>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setReason("");
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading || !reason.trim()}
            className="w-full sm:w-auto bg-btn-reject text-white hover:brightness-90"
          >
            {loading ? "Rejecting..." : "Reject Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}