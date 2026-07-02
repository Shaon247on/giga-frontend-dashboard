import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function ExpensesPageSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Alert Banner Skeleton */}
      <Skeleton className="h-20 w-full rounded-xl" />

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-24" />
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-1">
        <div className="flex gap-1">
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-1 h-10 rounded-lg" />
        </div>
      </div>

      {/* Search and Filter Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="flex-1 max-w-sm h-11 rounded-xl" />
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
                {["Employee", "Date", "Amount", "PO / Job", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-5 py-2.5 text-left">
                    <Skeleton className="h-3 w-20 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-20 rounded" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-3 w-12 rounded mt-1" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-3 w-16 rounded mt-1" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-7 w-20 rounded" />
                  </td>
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
                {[1, 2, 3].map((i) => (
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