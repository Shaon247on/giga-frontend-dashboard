import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function AccountsDashboardSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Alert Banner Skeleton */}
      <Skeleton className="h-16 w-full rounded-xl" />

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-24" />
        ))}
      </div>

      {/* Quick Access Cards Skeleton */}
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} className="h-20" />
        ))}
      </div>
    </div>
  );
}