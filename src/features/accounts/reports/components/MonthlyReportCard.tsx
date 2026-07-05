"use client";

import { useState } from "react";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/month-picker";
import type { MonthlyReportData } from "../types";

interface MonthlyReportCardProps {
  data: MonthlyReportData;
  onDownload: (month: string, year: string) => void;
}

export function MonthlyReportCard({ data, onDownload }: MonthlyReportCardProps) {
  const monthMap: Record<string, number> = {
    "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
    "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(parseInt(data.year), monthMap[data.month] || 0, 1)
  );

  const handleDownload = () => {
    if (selectedDate) {
      const month = format(selectedDate, "MMMM");
      const year = format(selectedDate, "yyyy");
      onDownload(month, year);
    }
  };

  const formattedMonth = selectedDate ? format(selectedDate, "MMMM yyyy") : "";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
          <CalendarIcon className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-primary-txt">Monthly Visa Report</h3>
          <p className="text-[11px] text-secondary-txt">Select a month to view report</p>
        </div>
      </div>

      {/* Month Picker */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
          Select Month
        </label>
        <MonthPicker
          date={selectedDate}
          setDate={setSelectedDate}
          placeholder="Select a month"
        />
      </div>

      {/* Results Card */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
        <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
          {formattedMonth || "Selected month"}
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-3xl font-bold text-primary-txt">
            {data.submissions} submission{data.submissions !== 1 ? "s" : ""}
          </p>
          <p className="text-[15px] font-semibold text-primary-txt">
            Total: ${data.total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={!selectedDate}
        className="w-full bg-btn-primary text-btn-primary-txt hover:brightness-90 disabled:opacity-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Report
      </Button>
    </div>
  );
}