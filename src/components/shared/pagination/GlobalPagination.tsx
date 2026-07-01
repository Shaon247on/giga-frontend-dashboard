"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlobalPaginationProps {
  total: number;
  pageSize?: number;
  pageParam?: string;
  className?: string;
  onPageChange?: (page: number) => void;
  currentPage?: number;
}

export function GlobalPagination({
  total = 0,
  pageSize = 10,
  pageParam = "page",
  className,
  onPageChange,
  currentPage: externalCurrentPage,
}: GlobalPaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const isInitialized = useRef(false);

  // Initialize from URL
  useEffect(() => {
    if (!isInitialized.current && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get(pageParam) || "1", 10);
      setInternalPage(page);
      isInitialized.current = true;
    }
  }, [pageParam]);

  const current = externalCurrentPage !== undefined ? externalCurrentPage : internalPage;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get(pageParam) || "1", 10);
      setInternalPage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pageParam, onPageChange]);

  const updateUrl = (page: number) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (page > 1) {
      params.set(pageParam, String(page));
    } else {
      params.delete(pageParam);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    
    window.history.pushState({}, '', newUrl);
    const event = new PopStateEvent('popstate', { state: {} });
    window.dispatchEvent(event);
  };

  const goto = (page: number) => {
    if (page < 1 || page > pages) return;
    
    if (externalCurrentPage === undefined) {
      setInternalPage(page);
    }
    
    if (onPageChange) {
      onPageChange(page);
    } else {
      updateUrl(page);
    }
  };

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }
    
    const items: (number | "ellipsis")[] = [1];
    if (current > 3) items.push("ellipsis");
    
    const start = Math.max(2, current - 1);
    const end = Math.min(pages - 1, current + 1);
    for (let i = start; i <= end; i++) items.push(i);
    
    if (current < pages - 2) items.push("ellipsis");
    items.push(pages);
    
    return items;
  };

  // Don't render if no items or only one page
  if (total === 0 || pages <= 1) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
      {/* Result count */}
      <p className="text-sm text-secondary-txt">
        Page <span className="font-medium text-primary-txt">{current}</span> of{" "}
        <span className="font-medium text-primary-txt">{pages}</span>
        {total > 0 && (
          <>
            {" · "}
            <span className="font-medium text-primary-txt">{total}</span> results
          </>
        )}
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goto(current - 1)}
          disabled={current <= 1}
          className="h-9 gap-1 px-3 text-sm font-medium border-slate-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((page, idx) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-secondary-txt select-none"
              >
                &hellip;
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goto(page)}
                aria-label={`Page ${page}`}
                aria-current={page === current ? "page" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
                  page === current
                    ? "bg-btn-primary text-btn-primary-txt shadow-sm pointer-events-none"
                    : "border border-slate-200 bg-white text-primary-txt hover:bg-slate-50",
                )}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goto(current + 1)}
          disabled={current >= pages}
          className="h-9 gap-1 px-3 text-sm font-medium border-slate-200"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}