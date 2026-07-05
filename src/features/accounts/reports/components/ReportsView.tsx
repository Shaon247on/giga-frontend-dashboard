"use client";

import { useState } from "react";
import { DailyReportCard } from "./DailyReportCard";
import { MonthlyReportCard } from "./MonthlyReportCard";
import { BookkeepingExportCard } from "./BookkeepingExportCard";
import { ReportPreviewTable } from "./ReportPreviewTable";
import type { ReportsPageData } from "../types";

interface ReportsViewProps {
  data: ReportsPageData;
}

export function ReportsView({ data }: ReportsViewProps) {
  const handleDailyDownload = (date: string) => {
    console.log("Downloading daily report for:", date);
    // TODO: Implement CSV download
  };

  const handleMonthlyDownload = (month: string, year: string) => {
    console.log("Downloading monthly report for:", month, year);
    // TODO: Implement CSV download
  };

  const handleExport = (id: string) => {
    console.log("Exporting:", id);
    // TODO: Implement export
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">Reports</h1>
        <p className="text-sm text-secondary-txt mt-1">
          Generate and export expense reports
        </p>
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DailyReportCard
          data={data.dailyData}
          onDownload={handleDailyDownload}
        />
        <MonthlyReportCard
          data={data.monthlyData}
          onDownload={handleMonthlyDownload}
        />
        <BookkeepingExportCard
          exports={data.exports}
          onExport={handleExport}
        />
      </div>

      {/* Preview Table */}
      <ReportPreviewTable
        data={data.previewItems}
        date={data.dailyData.date}
      />
    </div>
  );
}