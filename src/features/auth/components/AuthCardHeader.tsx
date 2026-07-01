import Image from "next/image";
import { type LucideIcon } from "lucide-react";

interface AuthCardHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle: string;
  useLogo?: boolean;
}

export function AuthCardHeader({
  icon: Icon,
  title,
  subtitle,
  useLogo = false,
}: AuthCardHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Icon badge */}
      <div className="w-14 h-14 rounded-2xl bg-btn-primary flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
        {useLogo ? (
          <Image
            src="/logo.png"
            alt="GTS's Finest"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        ) : Icon ? (
          <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
        ) : null}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h2 className="text-[18px] font-bold text-primary-txt leading-tight">{title}</h2>
        <p className="text-[13px] text-secondary-txt leading-tight mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}