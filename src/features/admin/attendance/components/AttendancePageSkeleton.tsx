import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function AttendancePageSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
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
                {["Employee", "Date", "Location", "In", "Out", "Hours", "Status"].map((header) => (
                  <th key={header} className="px-5 py-2.5 text-left">
                    <Skeleton className="h-3 w-20 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, index) => (
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
                    <Skeleton className="h-4 w-28 rounded" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-16 rounded" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-16 rounded" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-12 rounded" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
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