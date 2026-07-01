"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action } from "./types";

interface DataTableActionsProps<T> {
  item: T;
  actions: Action<T>[];
}

export function DataTableActions<T>({ item, actions }: DataTableActionsProps<T>) {
  return (
    <div className="flex items-center justify-end gap-2">
      {actions.map((action, index) => {
        const isDisabled = action.disabled?.(item) ?? false;

        return (
          <Button
            key={index}
            variant={action.variant || "outline"}
            size={action.size || "sm"}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(item);
            }}
            disabled={isDisabled}
            className={cn(
              "text-[12px] font-medium",
              action.className
            )}
          >
            {action.icon && <span className="mr-1.5">{action.icon}</span>}
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}