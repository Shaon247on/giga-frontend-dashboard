"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookkeepingExport } from "../types";

interface BookkeepingExportCardProps {
  exports: BookkeepingExport[];
  onExport: (id: string) => void;
}

export function BookkeepingExportCard({ exports, onExport }: BookkeepingExportCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-primary-txt">Bookkeeping Export</h3>
          <p className="text-[11px] text-secondary-txt">Export data in various formats</p>
        </div>
      </div>

      {/* Export Items */}
      <div className="space-y-2">
        {exports.map((item) => (
          <div
            key={item.id}
            onClick={() => onExport(item.id)}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-primary-txt">
                {item.title}
              </p>
              <p className="text-[11px] text-secondary-txt">
                {item.subtitle} • ${item.amount.toFixed(2)} • {item.fileType}
              </p>
            </div>
            <Download className="w-4 h-4 text-secondary-txt shrink-0 ml-3" />
          </div>
        ))}
      </div>
    </div>
  );
}