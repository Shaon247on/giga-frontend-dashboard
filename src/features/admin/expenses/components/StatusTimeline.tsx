import { CheckCircle, Circle, Clock, AlertCircle, XCircle, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExpenseStatus } from "@/types";

interface TimelineItem {
  status: ExpenseStatus;
  label: string;
  description: string;
  date?: string;
  by?: string;
}

interface StatusTimelineProps {
  timeline: TimelineItem[];
}

const STATUS_ICONS: Record<ExpenseStatus, { icon: React.ElementType; color: string; bg: string }> = {
  submitted: { 
    icon: Circle, 
    color: "text-blue-500", 
    bg: "bg-blue-50" 
  },
  "under-review": { 
    icon: Clock, 
    color: "text-amber-500", 
    bg: "bg-amber-50" 
  },
  reviewed: { 
    icon: CheckCircle, 
    color: "text-emerald-500", 
    bg: "bg-emerald-50" 
  },
  paid: { 
    icon: CheckCircle, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50" 
  },
  pending: { 
    icon: AlertCircle, 
    color: "text-amber-500", 
    bg: "bg-amber-50" 
  },
  rejected: { 
    icon: XCircle, 
    color: "text-red-500", 
    bg: "bg-red-50" 
  },
  reimbursed: { 
    icon: Receipt, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50" 
  },
};

export function StatusTimeline({ timeline }: StatusTimelineProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      <h3 className="text-[15px] font-bold text-primary-txt mb-4">Status Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => {
          const isLast = index === timeline.length - 1;
          const { icon: Icon, color, bg } = STATUS_ICONS[item.status] || STATUS_ICONS.pending;

          return (
            <div key={index} className="relative">
              {/* Vertical line */}
              {!isLast && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200" />
              )}
              
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10",
                  bg
                )}>
                  <Icon className={cn("w-4 h-4", color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-primary-txt">
                      {item.label}
                    </span>
                    {item.date && (
                      <span className="text-[11px] text-secondary-txt">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-secondary-txt mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}