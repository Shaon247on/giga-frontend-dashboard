import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export function ControlSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Status Banner Skeleton */}
      <SkeletonCard className="h-24 rounded-xl" />

      {/* Modules Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} className="h-20 rounded-xl" />
        ))}
      </div>

      {/* Footer Note Skeleton */}
      <SkeletonCard className="h-16 rounded-xl" />
    </div>
  );
}