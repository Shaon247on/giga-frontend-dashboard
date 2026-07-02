import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-slate-300/50",        // on white card backgrounds
        className
      )}
      {...props}
    />
  );
}

// Use this variant when the skeleton IS the card background itself
// e.g. the whole stat card or panel is not yet loaded
function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-card"
      className={cn(
        "animate-pulse rounded-2xl",
        "bg-slate-300/40",        // softer — sits on #F6F8FB page bg
        className
      )}
      {...props}
    />
  );
}

export { Skeleton, SkeletonCard };