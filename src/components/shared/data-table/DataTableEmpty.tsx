import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DataTableEmptyProps {
  message: string;
  icon?: ReactNode;
  className?: string;
}

export function DataTableEmpty({ 
  message, 
  icon,
  className 
}: DataTableEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4",
        "rounded-2xl bg-white border border-slate-200/60 shadow-sm",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <div className="text-slate-400">{icon}</div>
        </div>
      )}
      <p className="text-[15px] font-semibold text-primary-txt">{message}</p>
      <p className="text-[13px] text-secondary-txt mt-1">
        Try adjusting your filters or search terms
      </p>
    </div>
  );
}