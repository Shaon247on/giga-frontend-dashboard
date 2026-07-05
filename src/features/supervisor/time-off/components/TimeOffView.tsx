import { TimeOffStatCards } from "./TimeOffStatCards";
import { TimeOffFilterTabs } from "./TimeOffFilterTabs";
import { TimeOffRequestList } from "./TimeOffRequestList";
import type { TimeOffPageData, TimeOffFilter } from "../types";

interface TimeOffViewProps {
  data: TimeOffPageData;
  activeFilter: TimeOffFilter;
}

export function TimeOffView({ data, activeFilter }: TimeOffViewProps) {
  const filteredRequests = data.requests.filter((request) => {
    switch (activeFilter) {
      case "vacation":
        return request.requestType === "vacation";
      case "sick-days":
        return request.requestType === "sick-day";
      default:
        return true;
    }
  });

  return (
    <div className="p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">Time Off Review</h1>
        <p className="text-sm text-secondary-txt mt-1">
          Manage vacation requests and sick day submissions
        </p>
      </div>

      {/* Stat cards */}
      <TimeOffStatCards cards={data.statCards} />

      {/* Filter tabs */}
      <TimeOffFilterTabs tabs={data.filterTabs} activeFilter={activeFilter} />

      {/* Request list */}
      <TimeOffRequestList requests={filteredRequests} />
    </div>
  );
}