import { Suspense } from "react";
import { VehicleStatCards } from "./VehicleStatCards";
import { VehicleRequestList } from "./VehicleRequestList";
import { VehicleDetailPanel } from "./VehicleDetailPanel";
import type { VehiclesPageData } from "../types";

interface VehiclesViewProps {
  data: VehiclesPageData;
  selectedId: string | null;
}

export function VehiclesView({ data, selectedId }: VehiclesViewProps) {
  return (
    <div className="p-6 lg:p-8 space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Vehicle Maintenance
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Track repair requests and manage vehicle service status
        </p>
      </div>

      {/* Stat cards */}
      <VehicleStatCards cards={data.statCards} />

      {/* List + Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 items-start">
        <Suspense>
          <VehicleRequestList requests={data.requests} selectedId={selectedId} />
        </Suspense>

        <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm min-h-100 overflow-hidden mt-8">
          <Suspense>
            <VehicleDetailPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}