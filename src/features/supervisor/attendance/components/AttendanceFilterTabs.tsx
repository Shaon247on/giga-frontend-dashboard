"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { FilterTab, AttendanceFilter } from "../types";

interface AttendanceFilterTabsProps {
  tabs: FilterTab[];
  activeFilter: AttendanceFilter;
}

export function AttendanceFilterTabs({ tabs, activeFilter }: AttendanceFilterTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("filter");
      } else {
        params.set("filter", value);
      }
      // Keep on the base attendance path (clear selected record)
      router.push(`/dashboard/attendance?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Tabs value={activeFilter} onValueChange={handleChange}>
      <TabsList className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1 h-auto gap-1 max-w-80 md:max-w-xl overflow-scroll scrollbar-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200",
              "data-[state=active]:bg-[#135CC8] data-[state=active]:text-white data-[state=active]:shadow-sm",
              "data-[state=inactive]:text-[#667085] data-[state=inactive]:hover:text-[#0F172B]"
            )}
          >
            {tab.label}
            {tab.badge != null && tab.badge > 0 && (
              <span
                className={cn(
                  "ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold",
                  "bg-white/20 text-current data-[state=active]:bg-white/20",
                  // When inactive tab has a badge, show it in blue
                  "group-data-[state=inactive]:bg-blue-100 group-data-[state=inactive]:text-[#135CC8]"
                )}
              >
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}