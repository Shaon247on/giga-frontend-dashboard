import { Wrench } from "lucide-react";

export function VehicleDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-80 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Wrench className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-semibold text-primary-txt mb-1.5">Select a Request</h3>
      <p className="text-[13px] text-secondary-txt leading-snug max-w-50">
        Click any card to view details and take action
      </p>
    </div>
  );
}