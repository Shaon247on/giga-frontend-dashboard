export function VehiclesSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-5 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="h-4 w-80 bg-slate-200/70 rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-200/60" />
        ))}
      </div>
      <div className="grid grid-cols-[3fr_2fr] gap-5">
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200/60" />
          ))}
        </div>
        <div className="h-96 rounded-2xl bg-slate-200/60" />
      </div>
    </div>
  );
}