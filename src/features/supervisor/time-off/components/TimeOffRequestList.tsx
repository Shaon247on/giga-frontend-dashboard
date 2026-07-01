import { TimeOffRequestCard } from "./TimeOffRequestCard";
import type { TimeOffRequest } from "../types";

interface TimeOffRequestListProps {
  requests: TimeOffRequest[];
}

export function TimeOffRequestList({ requests }: TimeOffRequestListProps) {
  const needsActionCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-3">
      {needsActionCount > 0 && (
        <div className="flex items-center gap-2 pl-1">
          <span className="w-1 h-4 rounded-full bg-amber-400" aria-hidden="true" />
          <p className="text-[11px] font-bold text-table-header uppercase tracking-wide">
            Needs Action · {needsActionCount}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {requests.map((request) => (
          <TimeOffRequestCard key={request.id} request={request} />
        ))}
      </div>

      {requests.length === 0 && (
        <div className="rounded-2xl bg-white border border-slate-200/60 p-10 text-center">
          <p className="text-sm text-secondary-txt">No requests match this filter.</p>
        </div>
      )}
    </div>
  );
}