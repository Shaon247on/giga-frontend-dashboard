"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { OverviewAlert } from "../types";

interface OverviewAlertBannersProps {
  alerts: OverviewAlert[];
}

export function OverviewAlertBanners({ alerts }: OverviewAlertBannersProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = alerts.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-2">
      {visible.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
          <p className="flex-1 text-[12px] font-medium text-amber-700 leading-snug">
            {alert.message}
          </p>
          <button
            onClick={() => setDismissed((p) => new Set([...p, alert.id]))}
            className="text-amber-400 hover:text-amber-600 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}