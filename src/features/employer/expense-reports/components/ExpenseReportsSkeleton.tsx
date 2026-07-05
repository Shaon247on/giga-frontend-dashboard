import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function ExpenseReportsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-32" />
        ))}
      </div>

      {/* Breakdown Chart Skeleton */}
      <SkeletonCard className="h-80" />

      {/* Search and Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="flex-1 max-w-sm h-11 rounded-xl" />
        <Skeleton className="w-45 h-11 rounded-xl" />
        <Skeleton className="w-45 h-11 rounded-xl" />
      </div>

      {/* Table Skeleton */}
      <SkeletonCard className="rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <Skeleton className="h-4 w-28 rounded" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Employee", "Date", "Type", "PO / Job", "Amount", "Tax", "Status"].map((header) => (
                  <th key={header} className="px-5 py-2.5 text-left">
                    <Skeleton className="h-3 w-20 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-5 py-3.5">
                      <Skeleton className="h-4 w-full max-w-20 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20 rounded" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-9 w-9 rounded" />
                ))}
              </div>
              <Skeleton className="h-9 w-20 rounded" />
            </div>
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
}