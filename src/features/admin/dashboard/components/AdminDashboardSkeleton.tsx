export function AdminDashboardSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-64 bg-slate-200/70 rounded-md" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200/60" />
        ))}
      </div>

      {/* Employee Count Skeleton */}
      <div className="h-6 w-32 bg-slate-200/60 rounded-md" />

      {/* Quick Access Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-slate-200/60" />
        ))}
      </div>

      {/* Records Count Skeleton */}
      <div className="h-6 w-28 bg-slate-200/60 rounded-md" />
    </div>
  );
}