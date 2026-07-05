import {
  LayoutDashboard,
  Clock,
  CalendarOff,
  Wrench,
  Settings,
  LogOut,
  Users,
  DollarSign,
  CreditCard,
  FileText,
  Eye,
  Truck,
  Shield,
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

// ── Supervisor Navigation ──
export const SUPERVISOR_NAV: NavItem[] = [
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

// ── Admin Navigation ──
export const ADMIN_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Employee Management",
    href: "/admin/employees",
    icon: Users,
  },
  {
    label: "Vehicle Management",
    href: "/admin/vehicles",
    icon: Truck,
  },
  {
    label: "Punch Card & Time Off",
    href: "/admin/attendance",
    icon: Clock,
  },
  {
    label: "Expense Management",
    href: "/admin/expenses",
    icon: DollarSign,
  },
];

// ── Accounts Navigation ──
export const ACCOUNTS_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/accounts",
    icon: LayoutDashboard,
  },
  {
    label: "Personal Expenses",
    href: "/accounts/expenses",
    icon: DollarSign,
  },
  {
    label: "Visa / Company Card",
    href: "/accounts/visa",
    icon: CreditCard,
  },
  {
    label: "Reports",
    href: "/accounts/reports",
    icon: FileText,
  },
];

// ── Employer Navigation ──
export const EMPLOYER_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/employer",
    icon: LayoutDashboard,
  },
  {
    label: "Overview",
    href: "/employer/overview",
    icon: Eye,
  },
  {
    label: "Vehicle Reports",
    href: "/employer/vehicle-reports",
    icon: Truck,
  },
  {
    label: "Punch & Time Off Reports",
    href: "/employer/punch-reports",
    icon: Clock,
  },
  {
    label: "Expense Reports",
    href: "/employer/expense-reports",
    icon: DollarSign,
  },
  {
    label: "Control",
    href: "/employer/control",
    icon: Shield,
  },
];

// ── Bottom Navigation (shared across all roles) ──
export const BOTTOM_NAV_SUPERVISOR: NavItem[] = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
export const BOTTOM_NAV_ADMIN: NavItem[] = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
export const BOTTOM_NAV_ACCOUNTS: NavItem[] = [
  {
    label: "Settings",
    href: "/accounts/settings",
    icon: Settings,
  },
];
export const BOTTOM_NAV_EMPLOYER: NavItem[] = [
  {
    label: "Settings",
    href: "/employer/settings",
    icon: Settings,
  },
];

export const SIGN_OUT_ITEM = {
  label: "Sign Out",
  icon: LogOut,
};

// ── For backward compatibility ──
export const MAIN_NAV = SUPERVISOR_NAV;

// ── Role to Navigation mapping ──
export const ROLE_NAV_MAP: Record<string, NavItem[]> = {
  supervisor: SUPERVISOR_NAV,
  admin: ADMIN_NAV,
  accounts: ACCOUNTS_NAV,
  employer: EMPLOYER_NAV,
};
export const ROLE_BOTTOM_NAV_MAP: Record<string, NavItem[]> = {
  supervisor: BOTTOM_NAV_SUPERVISOR,
  admin: BOTTOM_NAV_ADMIN,
  accounts: BOTTOM_NAV_ACCOUNTS,
  employer: BOTTOM_NAV_EMPLOYER,
};

export type UserRole = "supervisor" | "admin" | "accounts" | "employer";