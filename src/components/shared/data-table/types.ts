import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => ReactNode;
  className?: string;
  sortable?: boolean;
}

export interface Action<T> {
  label: string;
  icon?: ReactNode;
  onClick: (item: T) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accept"
    | "reject"
    | "reject-soft";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  disabled?: (item: T) => boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  selectedId?: string | null;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  className?: string;
  loading?: boolean;
  rowClassName?: string | ((item: T) => string);
  showRecordCount?: boolean;

  // Pagination props
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}