"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RejectExpenseDialog } from "./RejectExpenseDialog";
import type { ExpensePreviewData } from "../types";

interface ExpenseDetailsViewProps {
  data: ExpensePreviewData;
}

export function ExpenseDetailsView({ data }: ExpenseDetailsViewProps) {
  const router = useRouter();
  const { expense, receipt } = data;
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.push("/accounts/expenses");
  };

  const handleMarkReimbursed = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Marked as reimbursed:", expense.id);
      router.back();
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
      console.log("Rejected expense:", expense.id, "Reason:", reason);
      setRejectDialogOpen(false);
      router.back();
    } catch (error) {
      console.error("Failed to reject expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPending = expense.status === "pending";
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
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-secondary-txt hover:text-primary-txt transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to expenses
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              Expense Detail
            </h1>
            <StatusBadge status={expense.status} />
          </div>
          <p className="text-sm text-secondary-txt mt-1">
            Receipt ID: {expense.receiptId}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {infoFields.map((field) => (
            <div key={field.label}>
              <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                {field.label}
              </p>
              <p className="text-[15px] font-medium text-primary-txt mt-0.5">
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
          <div className="w-full max-w-md aspect-4/3 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
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

        {/* Actions */}
        {isPending && (
          <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-slate-100">
            <Button
              variant="reject-soft"
              onClick={() => setRejectDialogOpen(true)}
              disabled={isSubmitting}
            >
              Reject
            </Button>
            <Button
              onClick={handleMarkReimbursed}
              disabled={isSubmitting}
              className="bg-btn-accept text-white hover:brightness-90"
            >
              {isSubmitting ? "Processing..." : "Mark Reimbursed"}
            </Button>
          </div>
        )}
      </div>

      {/* Reject Dialog */}
      <RejectExpenseDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onConfirm={handleReject}
        employeeName={expense.employeeName}
      />
    </div>
  );
}