import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2",
          "text-[13px] text-primary-txt placeholder:text-table-header",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/30 focus-visible:border-btn-primary",
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-slate-50",
          "ria-invalid:border-btn-reject aria-invalid:focus-visible:ring-btn-reject/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
