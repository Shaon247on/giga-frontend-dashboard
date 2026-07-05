import { Skeleton } from "@/components/ui/skeleton";

export default function PunchReportsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="flex-1 max-w-sm h-11 rounded-xl" />
        <Skeleton className="w-45 h-11 rounded-xl" />
      </div>
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}
