export function SettingsSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-5 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-40 bg-slate-200 rounded-lg" />
        <div className="h-4 w-72 bg-slate-200/70 rounded-md" />
      </div>
      <div className="h-56 rounded-2xl bg-slate-200/60" />
      <div className="h-96 rounded-2xl bg-slate-200/60" />
      <div className="h-64 rounded-2xl bg-slate-200/60" />
      <div className="h-24 rounded-2xl bg-slate-200/60" />
    </div>
  );
}