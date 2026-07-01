"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableRow } from "./DataTableRow";
import { DataTableEmpty } from "./DataTableEmpty";
import { DataTableSkeleton } from "./DataTableSkeleton";
import { GlobalPagination } from "@/components/shared/pagination";
import type { DataTableProps } from "./types";

export function DataTable<T>({
  data,
  columns,
  actions,
  keyExtractor,
  onRowClick,
  selectedId,
  emptyMessage = "No records found",
  emptyIcon,
  className,
  loading = false,
  rowClassName,
  showRecordCount = true,
  // Pagination props
  totalItems,
  currentPage,
  onPageChange,
  showPagination = true,
}: DataTableProps<T>) {
  if (loading) {
    return <DataTableSkeleton<T> columns={columns} rows={5} />;
  }

  if (data.length === 0) {
    return <DataTableEmpty message={emptyMessage} icon={emptyIcon} />;
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden",
        className,
      )}
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#EEF2F780]">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "px-5 py-2.5 text-left",
                    "text-[11px] font-semibold text-table-header uppercase tracking-wide",
                    "whitespace-nowrap",
                    column.className,
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="text-table-header/40">↕</span>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="px-5 py-2.5 text-right">
                  <span className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                    Actions
                  </span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.map((item) => {
              const key = keyExtractor(item);
              const isSelected = key === selectedId;

              return (
                <DataTableRow
                  key={key}
                  item={item}
                  columns={columns}
                  actions={actions}
                  isSelected={isSelected}
                  onRowClick={onRowClick}
                  rowClassName={rowClassName}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && totalItems && totalItems > 0 && (
        <div className="border-t border-slate-100 px-4 py-2">
          <GlobalPagination
            total={totalItems}
            pageSize={10}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
