"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Truck,
  Clock,
  CalendarOff,
  DollarSign,
  FileText,
  MapPin,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ControlModule } from "../types";

interface ControlModuleCardProps {
  module: ControlModule;
  onToggle: (id: string, enabled: boolean) => void;
  isUpdating?: boolean;
}

// Map icon names to actual Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Truck: Truck,
  Clock: Clock,
  CalendarOff: CalendarOff,
  DollarSign: DollarSign,
  FileText: FileText,
  MapPin: MapPin,
};

export function ControlModuleCard({
  module,
  onToggle,
  isUpdating = false,
}: ControlModuleCardProps) {
  // Get the icon component from the map, fallback to Settings
  const IconComponent = ICON_MAP[module.icon] || Settings;

  const handleToggle = (checked: boolean) => {
    onToggle(module.id, checked);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 p-4 rounded-xl",
        "bg-white border border-slate-200/60 shadow-sm",
        "transition-all duration-200",
        !module.isEnabled && "opacity-60",
        isUpdating && "opacity-50 pointer-events-none"
      )}
    >
      {/* Left side - Icon and Info */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            module.isEnabled ? "bg-blue-50" : "bg-slate-50"
          )}
        >
          <IconComponent
            className={cn(
              "w-5 h-5",
              module.isEnabled ? "text-blue-600" : "text-slate-400"
            )}
            strokeWidth={1.8}
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold text-primary-txt leading-tight">
            {module.name}
          </h4>
          <p className="text-[12px] text-secondary-txt mt-0.5 leading-snug">
            {module.description}
          </p>
        </div>
      </div>

      {/* Right side - Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className={cn(
            "text-[11px] font-medium",
            module.isEnabled ? "text-emerald-600" : "text-slate-400"
          )}
        >
          {module.isEnabled ? "ON" : "OFF"}
        </span>
        <Switch
          checked={module.isEnabled}
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className={cn(
            "data-[state=checked]:bg-emerald-500",
            "data-[state=unchecked]:bg-slate-300"
          )}
        />
      </div>
    </div>
  );
}