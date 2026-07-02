import { Bell } from "lucide-react";
import { ExpenseStatCards } from "./ExpenseStatCards";
import type { ExpensePageData } from "../types";

interface ExpensesPageHeaderProps {
  data: ExpensePageData;
}

export function ExpensesPageHeader({ data }: ExpensesPageHeaderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Expense Management
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Review, process, and report employee expenses
        </p>
      </div>

      {/* Alert Banner */}
      {data.alertMessage && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Bell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-700">
              Daily 8:00 AM Alert — {data.alertDate}
            </p>
            <p className="text-sm text-amber-600 mt-0.5">
              {data.alertMessage}
            </p>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <ExpenseStatCards stats={data.stats} />
    </div>
  );
}