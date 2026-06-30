import * as React from "react";
import { cn } from "@/lib/utils";

// ── FieldSet — wraps a logical group of fields (e.g. a form section) ──
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={cn("flex flex-col gap-5 border-0 m-0 p-0 min-w-0", className)}
      {...props}
    />
  );
}

// ── FieldLegend — section heading inside a FieldSet ──
function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      className={cn(
        variant === "legend"
          ? "text-[16px] font-bold text-primary-txt mb-1"
          : "text-[13px] font-semibold text-primary-txt",
        className
      )}
      {...props}
    />
  );
}

// ── FieldGroup — responsive grid wrapper for a set of Field components ──
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
      {...props}
    />
  );
}

// ── Field — single field wrapper (label + control + description/error) ──
function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & { orientation?: "vertical" | "horizontal" }) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "flex flex-col gap-1.5",
        orientation === "horizontal" &&
          "sm:flex-row sm:items-center sm:justify-between sm:gap-3",
        className
      )}
      {...props}
    />
  );
}

// ── FieldLabel — label tied to a control via htmlFor ──
function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-[11px] font-semibold text-table-header uppercase tracking-wide",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}

// ── FieldDescription — helper text below a control ──
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[12px] text-secondary-txt leading-snug", className)}
      {...props}
    />
  );
}

// ── FieldError — validation error message, only rendered when present ──
function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={cn("text-[12px] font-medium text-btn-reject leading-snug", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ── FieldSeparator — horizontal divider between field groups/sections ──
function FieldSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-slate-100", className)}
      {...props}
    />
  );
}

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
};