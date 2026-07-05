import Link from "next/link";
import { type LucideIcon, ChevronDown, ChevronUp } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  count?: number | string;
  countLabel?: string;
  seeAllHref: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function SectionHeader({
  icon: Icon,
  title,
  count,
  countLabel,
  seeAllHref,
  isExpanded = true,
  onToggle,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-secondary-txt" strokeWidth={1.8} />
        <h3 className="text-[14px] font-bold text-primary-txt">{title}</h3>
        {count !== undefined && (
          <span className="text-[12px] text-secondary-txt">
            {count} {countLabel}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onToggle && (
          <button
            onClick={onToggle}
            className="text-secondary-txt hover:text-primary-txt transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" strokeWidth={2} />
            ) : (
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        )}
        <Link
          href={seeAllHref}
          className="text-[12px] font-semibold text-btn-secondary-txt hover:underline flex items-center gap-1"
        >
          See All →
        </Link>
      </div>
    </div>
  );
}