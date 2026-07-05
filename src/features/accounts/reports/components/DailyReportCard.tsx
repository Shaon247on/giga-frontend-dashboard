"use client";

import { useState } from "react";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import type { DailyReportData } from "../types";

interface DailyReportCardProps {
  data: DailyReportData;
  onDownload: (date: string) => void;
}

export function DailyReportCard({ data, onDownload }: DailyReportCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(data.date)
  );

  const handleDownload = () => {
    if (selectedDate) {
      onDownload(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-primary-txt">Daily Personal Expenses</h3>
          <p className="text-[11px] text-secondary-txt">Select a date to view report</p>
        </div>
      </div>

      {/* Date Picker */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
          Select Date
        </label>
        <DatePicker
          date={selectedDate}
          setDate={setSelectedDate}
          placeholder="Select a date"
        />
      </div>

      {/* Results Card */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
        <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
          Results for {formattedDate || "selected date"}
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