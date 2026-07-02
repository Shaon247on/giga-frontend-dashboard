"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetListTab } from "./FleetListTab";
import { FuelReportTab } from "./FuelReportTab";
import { RepairRequestsTab } from "./RepairRequestsTab";
import { OilChangeTab } from "./OilChangeTab";
import type { FleetRecord, FuelReport, RepairRequest, OilChangeRecord } from "../types";

interface VehicleDetailsTabsProps {
  fleetList: FleetRecord[];
  fuelReports: FuelReport[];
  repairRequests: RepairRequest[];
  oilChanges: OilChangeRecord[];
}

export function VehicleDetailsTabs({
  fleetList,
  fuelReports,
  repairRequests,
  oilChanges,
}: VehicleDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("fleet");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1 h-auto gap-1 w-full overflow-x-auto">
        <TabsTrigger
          value="fleet"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Fleet List
        </TabsTrigger>
        <TabsTrigger
          value="fuel"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Fuel Report
        </TabsTrigger>
        <TabsTrigger
          value="repairs"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Repair Requests
        </TabsTrigger>
        <TabsTrigger
          value="oil"
          className="rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
        >
          Oil Change
        </TabsTrigger>
      </TabsList>

      <TabsContent value="fleet" className="mt-4">
        <FleetListTab data={fleetList} />
      </TabsContent>

      <TabsContent value="fuel" className="mt-4">
        <FuelReportTab data={fuelReports} />
      </TabsContent>

      <TabsContent value="repairs" className="mt-4">
        <RepairRequestsTab data={repairRequests} />
      </TabsContent>

      <TabsContent value="oil" className="mt-4">
        <OilChangeTab data={oilChanges} />
      </TabsContent>
    </Tabs>
  );
}