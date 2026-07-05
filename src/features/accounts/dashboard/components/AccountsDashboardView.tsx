import { Bell } from "lucide-react";
import { AccountsStatCards } from "./AccountsStatCards";
import { AccountsQuickAccessGrid } from "./AccountsQuickAccessGrid";
import type { AccountsDashboardData } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AccountsDashboardViewProps {
  data: AccountsDashboardData;
}

export function AccountsDashboardView({ data }: AccountsDashboardViewProps) {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Accounting Dashboard
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Tuesday, June 9, 2026 — Financial Overview
        </p>
      </div>

      {/* Alert Banner */}
      {data.alertMessage && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700">
                {data.alertMessage}
              </p>
            </div>
          </div>
          <Link href={"/accounts/expenses"}>
            <Button
              variant={"destructive"}
              className="bg-[#FEF3C6]  text-[#973C00] cursor-pointer"
            >
              View All
            </Button>
          </Link>
        </div>
      )}

      {/* Stat Cards */}
      <AccountsStatCards cards={data.statCards} />

      {/* Quick Access Cards */}
      <AccountsQuickAccessGrid cards={data.quickAccessCards} />
    </div>
  );
}
