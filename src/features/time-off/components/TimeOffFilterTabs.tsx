"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Plane, HeartPulse, ClipboardList } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { TimeOffFilterTab, TimeOffFilter } from "../types";

const TAB_ICONS: Record<TimeOffFilter, React.ReactNode> = {
  all: <ClipboardList className="w-3.5 h-3.5" />,
  vacation: <Plane className="w-3.5 h-3.5" />,
  "sick-days": <HeartPulse className="w-3.5 h-3.5" />,
};

interface TimeOffFilterTabsProps {
  tabs: TimeOffFilterTab[];
  activeFilter: TimeOffFilter;
}

export function TimeOffFilterTabs({ tabs, activeFilter }: TimeOffFilterTabsProps) {
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
      router.push(`/dashboard/time-off?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Tabs value={activeFilter} onValueChange={handleChange}>
      <TabsList className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1 h-auto gap-1 max-w-80 md:max-w-lg scrollbar-none overflow-scroll">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200",
              "data-[state=active]:bg-btn-primary data-[state=active]:text-btn-primary-txt data-[state=active]:shadow-sm",
              "data-[state=inactive]:text-secondary-txt data-[state=inactive]:hover:text-primary-txt"
            )}
          >
            {TAB_ICONS[tab.value]}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}