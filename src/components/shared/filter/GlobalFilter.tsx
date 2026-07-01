"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface GlobalFilterProps {
  name?: string;
  placeholder?: string;
  className?: string;
  options?: SelectOption[];
  defaultValue?: string;
}

export function GlobalFilter({
  name = "filter",
  placeholder = "All",
  className,
  options = [],
  defaultValue = "all",
}: GlobalFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL once on mount only — same pattern as GlobalSearch
  const [value, setValue] = useState(
    () => searchParams.get(name) ?? defaultValue
  );

  // Track whether the last change came from user selection vs URL navigation
  const isSelectingRef = useRef(false);

  // Sync FROM URL only on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      isSelectingRef.current = false;
      const urlValue =
        new URLSearchParams(window.location.search).get(name) ?? defaultValue;
      setValue(urlValue);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [name, defaultValue]);

  const handleChange = (newValue: string) => {
    isSelectingRef.current = true;
    setValue(newValue);

    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue !== defaultValue) {
      params.set(name, newValue);
    } else {
      params.delete(name);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  // Prepend "All" option automatically so callers don't have to repeat it
  const allOptions: SelectOption[] = [
    { value: defaultValue, label: placeholder },
    ...options,
  ];

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "w-full min-w-35 rounded-xl border-slate-200 bg-white px-3 text-sm text-primary-txt shadow-sm",
          "focus:ring-2 focus:ring-btn-primary/30 focus:border-btn-primary",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
        {allOptions.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer hover:bg-slate-50 transition-colors text-[13px] text-primary-txt"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}