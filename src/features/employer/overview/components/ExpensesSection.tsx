"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionHeader } from "./SectionHeader";
import type { ExpenseItem, ExpenseSummary } from "../types";
import { cn } from "@/lib/utils";

interface ExpensesSectionProps {
  expenses: ExpenseItem[];
  summary: ExpenseSummary;
}

export function ExpensesSection({ expenses, summary }: ExpensesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getTypeColor = (type: string) => {
    return type === "Personal" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionHeader
          icon={DollarSign}
          title="Expenses"
          count={expenses.length}
          countLabel="items"
          seeAllHref="/employer/overview/expense-reports"
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {isExpanded && (
        <>
          {/* Summary */}
          <div className="px-4 pt-4 pb-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-bold text-primary-txt">${summary.personalPending.toFixed(2)}</p>
                <p className="text-[9px] text-secondary-txt uppercase tracking-wide">Pending</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-bold text-primary-txt">${summary.personalPaid.toFixed(2)}</p>
                <p className="text-[9px] text-secondary-txt uppercase tracking-wide">Paid</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-bold text-primary-txt">${summary.visaTotal.toFixed(2)}</p>
                <p className="text-[9px] text-secondary-txt uppercase tracking-wide">Visa</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-bold text-blue-600">${summary.grandTotal.toFixed(2)}</p>
                <p className="text-[9px] text-secondary-txt uppercase tracking-wide">Total</p>
              </div>
            </div>
          </div>

          {/* Expenses List */}
          <div className="px-4 py-3 space-y-2 max-h-65 overflow-y-auto">
            {expenses.slice(0, 4).map((expense) => (
              <div key={expense.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: expense.avatarColor }}
                >
                  <span className="text-[10px] font-bold text-white">{expense.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-primary-txt truncate">
                      {expense.employeeName}
                    </p>
                    <StatusBadge status={expense.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      getTypeColor(expense.type)
                    )}>
                      {expense.type}
                    </span>
                    <span className="text-[12px] font-medium text-primary-txt">
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-[13px] text-secondary-txt py-4">No expenses</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}