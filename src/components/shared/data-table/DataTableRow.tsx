"use client";

import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTableActions } from "./DataTableActions";
import type { Column, Action } from "./types";

interface DataTableRowProps<T> {
  item: T;
  columns: Column<T>[];
  actions?: Action<T>[];
  isSelected: boolean;
  onRowClick?: (item: T) => void;
  rowClassName?: string | ((item: T) => string);
}

export function DataTableRow<T>({
  item,
  columns,
  actions,
  isSelected,
  onRowClick,
  rowClassName,
}: DataTableRowProps<T>) {
  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const className = typeof rowClassName === "function" 
    ? rowClassName(item) 
    : rowClassName;

  return (
    <TableRow
      onClick={handleRowClick}
      className={cn(
        "transition-colors duration-150 border-0",
        onRowClick && "cursor-pointer hover:bg-slate-50/80",
        isSelected && "bg-blue-50/60 border-l-2 border-l-btn-primary",
        className
      )}
    >
      {columns.map((column) => {
        // Safely access the value using keyof T
        const value = (item as Record<string, unknown>)[column.key];
        return (
          <TableCell
            key={column.key}
            className={cn(
              "px-5 py-3.5 text-[13px] text-primary-txt",
              "whitespace-nowrap",
              column.className
            )}
          >
            {column.cell ? column.cell(item) : (value as string | number | boolean | null | undefined)}
          </TableCell>
        );
      })}
      {actions && actions.length > 0 && (
        <TableCell className="px-5 py-3.5 text-right">
          <DataTableActions item={item} actions={actions} />
        </TableCell>
      )}
    </TableRow>
  );
}