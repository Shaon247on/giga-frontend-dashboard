import { 
  Users, 
  Calendar, 
  DollarSign, 
  Truck,
  Clock
} from "lucide-react";
import type { AdminStatCard, AdminQuickAccessCard } from "../types";

export const ADMIN_STAT_ICONS = {
  users: Users,
  calendar: Calendar,
  "dollar-sign": DollarSign,
  truck: Truck,
} as const;

export const ADMIN_QUICK_ICONS = {
  users: Users,
  truck: Truck,
  clock: Clock,
  "dollar-sign": DollarSign,
} as const;

export const STAT_CARD_STYLES = {
  users: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
  },
  calendar: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
  },
  "dollar-sign": {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
  truck: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconColor: "text-purple-600",
  },
} as const;

export const QUICK_ICON_STYLES = {
  users: "bg-blue-50 text-blue-600 border-blue-200",
  truck: "bg-purple-50 text-purple-600 border-purple-200",
  clock: "bg-amber-50 text-amber-600 border-amber-200",
  "dollar-sign": "bg-emerald-50 text-emerald-600 border-emerald-200",
} as const;