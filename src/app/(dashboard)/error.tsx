"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-100 p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" strokeWidth={1.8} />
      </div>
      <h2 className="text-lg font-bold text-[#0F172B] mb-2">Something went wrong</h2>
      <p className="text-sm text-[#667085] mb-6 max-w-sm">
        We couldn&apos;t load the dashboard. Please try again.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#135CC8] text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        <RefreshCcw className="w-4 h-4" strokeWidth={2} />
        Try again
      </button>
    </div>
  );
}