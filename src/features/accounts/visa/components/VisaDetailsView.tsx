"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VisaImagePreview } from "./VisaImagePreview";
import { RejectVisaDialog } from "./RejectVisaDialog";
import type { VisaDetailsData } from "../types";
import { cn } from "@/lib/utils";

interface VisaDetailsViewProps {
  data: VisaDetailsData;
}

export function VisaDetailsView({ data }: VisaDetailsViewProps) {
  const router = useRouter();
  const { expense, receipt } = data;
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPending = expense.status === "pending";
  const isReviewed = expense.status === "reviewed";

  const handleBack = () => {
    router.push("/accounts/visa");
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Approved visa expense:", expense.id);
      router.refresh();
    } catch (error) {
      console.error("Failed to approve expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (reason: string) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Rejected visa expense:", expense.id, "Reason:", reason);
      setRejectDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to reject expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    console.log("Downloading receipt PDF for:", expense.id);
  };

  const infoCards = [
    { label: "Amount", value: `$${expense.amount.toFixed(2)}`, icon: "$" },
    { label: "Job Type", value: receipt.jobType, icon: "📋" },
    { label: "Tax", value: `$${expense.tax.toFixed(2)}`, icon: "🧾" },
    { label: "Paid Date", value: expense.paidDate || "Not paid", icon: "📅" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-secondary-txt hover:text-primary-txt transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Visa Expenses
      </button>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Receipt Image (3/5) */}
        <div className="lg:col-span-3">
          <VisaImagePreview className="aspect-[4/3] max-h-[600px]" />
        </div>

        {/* Right Column - Details (2/5) */}
        <div className="lg:col-span-2 space-y-4 bg-card p-4 rounded-lg">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[20px] font-bold text-primary-txt leading-tight">
                {expense.receiptId}
              </h1>
              <p className="text-sm text-secondary-txt">
                Visa expense • {receipt.employee}
              </p>
            </div>
            <StatusBadge status={expense.status} />
          </div>

          {/* Original Receipt Info */}
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
            <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide mb-2">
              Original Receipt
            </p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-txt">Vendor</span>
                <span className="font-medium text-primary-txt">{receipt.vendor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-txt">Tax ID</span>
                <span className="font-medium text-primary-txt">{receipt.taxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-txt">Card</span>
                <span className="font-medium text-primary-txt">•••• {receipt.cardEnding}</span>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {infoCards.map((card) => (
              <div key={card.label} className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-sm">
                <p className="text-[10px] font-semibold text-table-header uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-[15px] font-bold text-primary-txt mt-0.5">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/60 pt-4">
            <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide mb-3">
              Receipt Review
            </p>

            {/* Status Message */}
            <div className="flex items-center gap-2 text-sm text-secondary-txt mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {isPending && "Awaiting review"}
              {isReviewed && "✓ Reviewed and matched"}
            </div>

            {/* Actions */}
            {isPending ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Approve"}
                </Button>
                <Button
                  variant="reject-soft"
                  onClick={() => setRejectDialogOpen(true)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full border-slate-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      <RejectVisaDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onConfirm={handleReject}
        employeeName={receipt.employee}
      />
    </div>
  );
}