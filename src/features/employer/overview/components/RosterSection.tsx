"use client";

import { useState } from "react";
import { Users, Car, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import type { RosterEmployee } from "../types";

const ROLE_COLOR: Record<string, string> = {
  Employee: "text-primary-txt",
  Supervisor: "text-violet-600",
  Admin: "text-blue-600",
};

interface RosterSectionProps {
  employees: RosterEmployee[];
}

export function RosterSection({ employees }: RosterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionHeader
          icon={Users}
          title="Employee Roster"
          count={employees.length}
          countLabel="total"
          seeAllHref="/employer/overview/employee-roster"
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {isExpanded && (
        <div className="divide-y divide-slate-100 max-h-100 overflow-y-auto">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="px-4 py-3 hover:bg-slate-50/60 transition-colors"
            >
              {/* Top row: avatar + name + role + active badge */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
                    style={{ backgroundColor: emp.avatarColor }}
                  >
                    {emp.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-primary-txt leading-tight truncate">
                      {emp.name}
                    </p>
                    <span
                      className={cn(
                        "inline-block text-[11px] font-semibold mt-0.5 leading-tight",
                        ROLE_COLOR[emp.role],
                      )}
                    >
                      {emp.role}
                    </span>
                  </div>
                </div>
                {emp.isActive && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                )}
              </div>

              {/* Detail fields */}
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <Car
                    className="w-3 h-3 text-secondary-txt shrink-0"
                    strokeWidth={1.8}
                  />
                  <span className="text-[11px] text-secondary-txt truncate">
                    {emp.vehicle ?? "No vehicle assigned"}
                  </span>
                </div>
                {emp.todayPunch && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <Clock
                      className="w-3 h-3 text-secondary-txt shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="text-[11px] text-secondary-txt truncate">
                      {emp.todayPunch}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
