import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Column } from "./types";

interface DataTableSkeletonProps<T = unknown> {
  columns: Column<T>[];
  rows?: number;
}

export function DataTableSkeleton<T>({ 
  columns, 
  rows = 5 
}: DataTableSkeletonProps<T>) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden animate-pulse">
      {/* Record count skeleton */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <div className="h-4 w-28 bg-slate-200 rounded" />
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              {columns.map((column) => (
                <TableHead key={column.key} className="px-5 py-2.5">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </TableHead>
              ))}
              <TableHead className="px-5 py-2.5 text-right">
                <div className="h-3 w-12 bg-slate-200 rounded ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index} className="border-0">
                {columns.map((column) => (
                  <TableCell key={column.key} className="px-5 py-3.5">
                    <div className="h-4 w-full max-w-30 bg-slate-200/60 rounded" />
                  </TableCell>
                ))}
                <TableCell className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-7 w-14 bg-slate-200/60 rounded" />
                    <div className="h-7 w-14 bg-slate-200/60 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}