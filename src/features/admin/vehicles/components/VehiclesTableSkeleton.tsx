export function VehiclesTableSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden animate-pulse">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <div className="h-4 w-28 bg-slate-200 rounded" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Vehicle", "Year / Make", "Plate", "Mileage", "Assigned To", "Status", "Actions"].map((header) => (
                <th key={header} className="px-5 py-2.5 text-left">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-200" />
                    <div>
                      <div className="h-4 w-16 bg-slate-200/60 rounded" />
                      <div className="h-3 w-20 bg-slate-200/40 rounded mt-1" />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-4 w-24 bg-slate-200/60 rounded" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-4 w-20 bg-slate-200/60 rounded" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-4 w-16 bg-slate-200/60 rounded" />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <div className="h-4 w-20 bg-slate-200/60 rounded" />
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="h-5 w-16 bg-slate-200/60 rounded-full" />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-7 w-14 bg-slate-200/60 rounded" />
                    <div className="h-7 w-14 bg-slate-200/60 rounded" />
                    <div className="h-7 w-14 bg-slate-200/60 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-slate-200 rounded" />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-9 w-9 bg-slate-200 rounded" />
              ))}
            </div>
            <div className="h-9 w-20 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}