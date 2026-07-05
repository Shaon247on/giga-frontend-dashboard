"use client";

import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ReportItem } from "../types";

interface ReportPreviewTableProps {
  data: ReportItem[];
  date: string;
}

export function ReportPreviewTable({ data, date }: ReportPreviewTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-[15px] font-bold text-primary-txt">
          Preview — Daily Report {date}
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Employee
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Amount
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Tax
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                PO
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Job
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Type
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3.5 text-[13px] font-medium text-primary-txt">
                  {item.employee}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-primary-txt">
                  ${item.amount.toFixed(2)}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-primary-txt">
                  ${item.tax.toFixed(2)}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-primary-txt">
                  {item.po}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-primary-txt">
                  {item.job}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-primary-txt">
                  {item.type}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}