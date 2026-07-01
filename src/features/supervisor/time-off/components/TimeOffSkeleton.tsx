export function TimeOffDetailSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-4 animate-pulse">
      <div className="h-5 w-32 bg-slate-200 rounded-md" />
      <div className="h-105 rounded-2xl bg-slate-200/60" />
    </div>
  );
}

export function TimeOffSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-5 max-w-3xl mx-auto animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 bg-slate-200 rounded-lg" />
        <div className="h-4 w-72 bg-slate-200/70 rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-200/60" />
        ))}
      </div>
      <div className="h-11 w-80 rounded-xl bg-slate-200/60" />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-44 rounded-2xl bg-slate-200/60" />
        ))}
      </div>
    </div>
  );
}