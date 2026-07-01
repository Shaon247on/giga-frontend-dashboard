"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

interface GlobalSearchProps {
  name?: string;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function GlobalSearch({
  name = "search",
  placeholder = "Search...",
  className,
  debounceMs = 300,
}: GlobalSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL once on mount only
  const [value, setValue] = useState(() => searchParams.get(name) ?? "");
  const debouncedValue = useDebounce(value, debounceMs);

  // Track whether the last change came from user typing vs URL navigation
  const isTypingRef = useRef(false);

  // Push debounced value to URL — only when user typed it
  useEffect(() => {
    if (!isTypingRef.current) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set(name, debouncedValue);
    } else {
      params.delete(name);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync FROM URL only on browser back/forward navigation (not on every searchParams change)
  useEffect(() => {
    const handlePopState = () => {
      isTypingRef.current = false;
      const urlValue =
        new URLSearchParams(window.location.search).get(name) ?? "";
      setValue(urlValue);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    setValue(e.target.value);
  };

  const handleClear = () => {
    isTypingRef.current = false;
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isTypingRef.current = false;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-secondary-txt pointer-events-none" />
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-11 pl-9 pr-20 rounded-xl bg-white border-slate-200 shadow-sm"
        />
        <div className="absolute right-1 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="flex h-7 w-7 items-center justify-center rounded-md text-secondary-txt hover:text-primary-txt hover:bg-slate-100 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
