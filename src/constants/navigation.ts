import {
  LayoutDashboard,
  Clock,
  CalendarOff,
  Wrench,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  items: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Punch Card & Attendance",
    href: "/dashboard/attendance",
    icon: Clock,
  },
  {
    label: "Time Off",
    href: "/dashboard/time-off",
    icon: CalendarOff,
  },
  {
    label: "Vehicle Maintenance",
    href: "/dashboard/vehicles",
    icon: Wrench,
  },
];

export const BOTTOM_NAV: NavItem[] = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export const SIGN_OUT_ITEM = {
  label: "Sign Out",
  icon: LogOut,
};