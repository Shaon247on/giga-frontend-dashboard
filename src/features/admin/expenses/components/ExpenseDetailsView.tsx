"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatusTimeline } from "./StatusTimeline";
import type { ExpenseDetailsData } from "../types";

interface ExpenseDetailsViewProps {
  data: ExpenseDetailsData;
}

export function ExpenseDetailsView({ data }: ExpenseDetailsViewProps) {
  const router = useRouter();
  const { expense, receipt, timeline } = data;

  const handleBack = () => {
    router.push("/admin/expenses");
  };

  const receiptFields = [
    { label: "Date", value: receipt.date },
    { label: "Employee", value: receipt.employee },
    { label: "PO", value: receipt.poNumber },
    { label: "Job", value: receipt.jobNumber },
    { label: "Type", value: receipt.type },
  ];

  const expenseInfo = [
    { label: "Date", value: expense.date },
    { label: "PO NUMBER", value: expense.poNumber },
    { label: "JOB", value: expense.jobNumber },
    { label: "JOB TYPE", value: receipt.type },
    { label: "TAX AMOUNT", value: `$${expense.tax.toFixed(2)}` },
    { label: "PAID DATE", value: expense.paidDate || "Not yet paid" },
  ];

  const typeLabel = expense.type === "personal" ? "Personal Expense" : "Visa / Company Card";

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
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              Expense Detail
            </h1>
            <StatusBadge status={expense.status} />
          </div>
          <p className="text-sm text-secondary-txt mt-1">
            Receipt ID: {expense.receiptId} · {typeLabel}
          </p>
        </div>
      </div>

      {/* Employee Info */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-slate-100">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: expense.avatarColor }}
        >
          <span className="text-[14px] font-bold text-white">{expense.initials}</span>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-primary-txt">{expense.employeeName}</p>
          <p className="text-[13px] text-secondary-txt">Field Employee · {receipt.type}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Receipt */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-primary-txt mb-4">Original Receipt</h3>
          
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
            <div className="text-center mb-4">
              <p className="text-[13px] font-bold text-primary-txt uppercase tracking-wide">
                {receipt.vendor}
              </p>
              <p className="text-[11px] text-secondary-txt">Tax ID {receipt.taxId}</p>
            </div>

            <div className="space-y-2">
              {receiptFields.map((field) => (
                <div key={field.label} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                  <span className="text-secondary-txt">{field.label}</span>
                  <span className="font-medium text-primary-txt">{field.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-txt">Subtotal</span>
                <span className="text-primary-txt">${receipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-txt">HST / Tax</span>
                <span className="text-primary-txt">${receipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold mt-2 pt-2 border-t-2 border-slate-200">
                <span className="text-primary-txt">TOTAL</span>
                <span className="text-primary-txt">${receipt.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Expense Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-primary-txt mb-4">Expense Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {expenseInfo.map((field) => (
                <div key={field.label} className={field.label === "PAID DATE" ? "col-span-2" : ""}>
                  <p className="text-[10px] font-semibold text-table-header uppercase tracking-wide">
                    {field.label}
                  </p>
                  <p className="text-[14px] font-medium text-primary-txt mt-1">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <StatusTimeline timeline={timeline} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
        <Button className="bg-btn-primary text-btn-primary-txt hover:brightness-90">
          <Send className="w-4 h-4 mr-2" />
          Send Payment to {expense.employeeName.split(" ")[0]}
        </Button>
        <Button variant="outline" className="border-slate-200">
          <Download className="w-4 h-4 mr-2" />
          Download Receipt PDF
        </Button>
      </div>
    </div>
  );
}