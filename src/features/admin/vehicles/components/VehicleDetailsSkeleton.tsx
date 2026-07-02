export function VehicleDetailsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between bg-card p-4 rounded-xl">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-32 bg-slate-200 rounded-lg" />
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
          </div>
          <div className="h-4 w-48 bg-slate-200/70 rounded-md mt-1" />
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/60 shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200/60 rounded mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        {/* Tab Headers Skeleton */}
        <div className="flex gap-1 p-1 bg-white border border-slate-200/80 shadow-sm rounded-xl">
          {["Fleet List", "Fuel Report", "Repair Requests", "Oil Change"].map((tab) => (
            <div
              key={tab}
              className="flex-1 h-10 bg-slate-200 rounded-lg"
            />
          ))}
        </div>

        {/* Tab Content Skeleton */}
        <div className="mt-4">
          {/* Table Skeleton inside tab */}
          <div className="rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <div className="h-4 w-28 bg-slate-200 rounded" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"].map((header) => (
                      <th key={header} className="px-5 py-2.5 text-left">
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: 5 }).map((_, colIndex) => (
                        <td key={colIndex} className="px-5 py-3.5">
                          <div className="h-4 w-full max-w-25 bg-slate-200/60 rounded" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}