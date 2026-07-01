import { Clock } from "lucide-react";

export function DetailPanelEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-80 text-center px-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Clock className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-semibold text-[#0F172B] mb-1.5">Select a Record</h3>
      <p className="text-[13px] text-[#667085] leading-snug max-w-45">
        Click any row to view punch details and take action
      </p>
    </div>
  );
}