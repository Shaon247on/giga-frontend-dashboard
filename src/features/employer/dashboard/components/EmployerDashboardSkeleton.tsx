import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function EmployerDashboardSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} className="h-32" />
        ))}
      </div>

      {/* Two Column Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Alerts Skeleton */}
        <div className="lg:col-span-2">
          <SkeletonCard className="h-80" />
        </div>

        {/* Attendance Skeleton */}
        <div className="lg:col-span-3">
          <SkeletonCard className="h-80" />
        </div>
      </div>
    </div>
  );
}