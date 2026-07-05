import { OverviewAlertBanners } from "./OverviewAlertBanners";
import { OverviewStatCards } from "./OverviewStatCards";
import { CompanyHoursChart } from "./CompanyHoursChart";
import { RosterSection } from "./RosterSection";
import { TimeOffSection } from "./TimeOffSection";
import { ExpensesSection } from "./ExpensesSection";
import { MaintenanceSection } from "./MaintenanceSection";
import type { OverviewPageData } from "../types";

interface OverviewViewProps {
  data: OverviewPageData;
}

export function OverviewView({ data }: OverviewViewProps) {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Company Overview
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Full operational snapshot — FieldForce Operations Ltd.
        </p>
      </div>

      {/* Alert Banners */}
      <div className="mb-6">
        <OverviewAlertBanners alerts={data.alerts} />
      </div>

      {/* Stat Cards */}
      <div className="mb-6">
        <OverviewStatCards cards={data.statCards} />
      </div>

      {/* Chart + Roster Grid */}
      <div className="w-full mb-6">
        <div className="">
          <CompanyHoursChart bars={data.weeklyHours} />
        </div>
        <div className="lg:col-span-8"></div>
      </div>

      {/* Time Off + Expenses + Maintenance Grid */}
      <div className="grid grid-cols-1 gap-6">
        <RosterSection employees={data.employees} />
        <TimeOffSection requests={data.timeOff} summary={data.timeOffSummary} />
        <ExpensesSection
          expenses={data.expenses}
          summary={data.expenseSummary}
        />
        <MaintenanceSection items={data.maintenance} />
      </div>
    </div>
  );
}
