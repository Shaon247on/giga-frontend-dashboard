import { 
  DollarSign, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  CreditCard,
  FileText,
  Users
} from "lucide-react";

export const ACCOUNTS_STAT_ICONS = {
  total: DollarSign,
  pending: AlertTriangle,
  reviewed: Clock,
  paid: CheckCircle,
} as const;

export const ACCOUNTS_QUICK_ICONS = {
  personal: Users,
  visa: CreditCard,
  reports: FileText,
} as const;

export const STAT_CARD_STYLES = {
  total: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconColor: "text-purple-600",
  },
  pending: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
  },
  reviewed: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
  },
  paid: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
  },
} as const;

export const QUICK_ICON_STYLES = {
  personal: "bg-blue-50 text-blue-600 border-blue-200",
  visa: "bg-purple-50 text-purple-600 border-purple-200",
  reports: "bg-emerald-50 text-emerald-600 border-emerald-200",
} as const;