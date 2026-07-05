import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function OverviewSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Alert Banners Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-20" />
        ))}
      </div>

      {/* Chart + Roster Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <SkeletonCard className="h-64" />
        </div>
        <div className="lg:col-span-3">
          <SkeletonCard className="h-64" />
        </div>
      </div>

      {/* Three Column Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} className="h-80" />
        ))}
      </div>
    </div>
  );
}