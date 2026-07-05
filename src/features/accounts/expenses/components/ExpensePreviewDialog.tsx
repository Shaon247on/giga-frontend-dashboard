"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { RejectExpenseDialog } from "./RejectExpenseDialog";
import type { ExpensePreviewData } from "../types";

interface ExpensePreviewDialogProps {
  data: ExpensePreviewData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject?: (id: string, reason: string) => void;
  onMarkReimbursed?: (id: string) => void;
  loading?: boolean;
}

export function ExpensePreviewDialog({
  data,
  open,
  onOpenChange,
  onReject,
  onMarkReimbursed,
  loading = false,
}: ExpensePreviewDialogProps) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-130 rounded-2xl p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </DialogHeader>
          </div>

          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-4 w-24 rounded mt-1" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Skeleton className="h-3 w-32 rounded mb-2" />
              <Skeleton className="w-full aspect-4/3 rounded-xl" />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!data) return null;

  const { expense, receipt } = data;
  const isPending = expense.status === "pending";

  const handleMarkReimbursed = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onMarkReimbursed?.(expense.id);
    } catch (error) {
      console.error("Failed to mark as reimbursed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (reason: string) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onReject?.(expense.id, reason);
      setRejectDialogOpen(false);
    } catch (error) {
      console.error("Failed to reject expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoFields = [
    { label: "Employee", value: expense.employeeName },
    { label: "Date", value: expense.date },
    { label: "Amount", value: `$${expense.amount.toFixed(2)}` },
    { label: "Tax", value: `$${expense.tax.toFixed(2)}` },
    { label: "PO", value: expense.poNumber },
    { label: "Job", value: expense.jobNumber },
    { label: "Job Type", value: receipt.jobType },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-130 rounded-2xl p-0 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogHeader>
              <div className="flex flex-col items-start gap-2">
                <DialogTitle className="text-[17px] font-bold text-primary-txt">
                  Expense Detail
                </DialogTitle>
                <StatusBadge status={expense.status} />
              </div>
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {infoFields.map((field) => (
                <div key={field.label}>
                  <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                    {field.label}
                  </p>
                  <p className="text-[14px] font-medium text-primary-txt mt-0.5">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Receipt Image Preview */}
            <div className="mt-6">
              <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide mb-2">
                Receipt image preview
              </p>
              <div className="w-full aspect-4/3 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[12px] text-secondary-txt">Receipt Image</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {isPending ? (
                <>
                  <Button
                    type="button"
                    variant="reject-soft"
                    onClick={() => setRejectDialogOpen(true)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Reject
                  </Button>
                  <Button
                    type="button"
                    onClick={handleMarkReimbursed}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-btn-accept text-white hover:brightness-90"
                  >
                    {isSubmitting ? "Processing..." : "Mark Reimbursed"}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <RejectExpenseDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onConfirm={handleReject}
        employeeName={expense.employeeName}
      />
    </>
  );
}