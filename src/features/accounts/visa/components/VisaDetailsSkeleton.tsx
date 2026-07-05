import { Skeleton } from "@/components/ui/skeleton";

export function VisaDetailsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <Skeleton className="h-4 w-32 rounded" />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Image Skeleton */}
        <div className="lg:col-span-3">
          <Skeleton className="aspect-[4/3] rounded-xl max-h-[600px]" />
        </div>

        {/* Right Column - Details Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header Skeleton */}
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="h-7 w-32 rounded" />
              <Skeleton className="h-4 w-40 rounded mt-1" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Original Receipt Skeleton */}
          <Skeleton className="h-32 w-full rounded-xl" />

          {/* Info Cards Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>

          {/* Actions Skeleton */}
          <div className="border-t border-slate-200/60 pt-4">
            <Skeleton className="h-3 w-24 rounded mb-3" />
            <div className="flex flex-col sm:flex-row gap-2">
              <Skeleton className="h-10 flex-1 rounded-xl" />
              <Skeleton className="h-10 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}