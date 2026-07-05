import type { ControlPageData, ControlModule } from "../types";

export const MOCK_CONTROL_MODULES: ControlModule[] = [
  {
    id: "vehicle-management",
    name: "Vehicle Management",
    description: "Fuel entries and maintenance requests",
    isEnabled: true,
    icon: "Truck",
  },
  {
    id: "punch-attendance",
    name: "Punch Card / Attendance",
    description: "Clock-in/out and timesheet tracking",
    isEnabled: true,
    icon: "Clock",
  },
  {
    id: "time-off-management",
    name: "Time Off Management",
    description: "Vacation and sick day requests",
    isEnabled: true,
    icon: "CalendarOff",
  },
  {
    id: "expense-submissions",
    name: "Expense Submissions",
    description: "Personal and Visa expense uploads",
    isEnabled: true,
    icon: "DollarSign",
  },
  {
    id: "pay-stub-access",
    name: "Pay Stub Access",
    description: "Employee pay stub PDF viewing",
    isEnabled: true,
    icon: "FileText",
  },
  {
    id: "out-of-town-punches",
    name: "Out of Town Punches",
    description: "Remote and out-of-town clock-in flows",
    isEnabled: true,
    icon: "MapPin",
  },
];

export const MOCK_CONTROL_DATA: ControlPageData = {
  modules: MOCK_CONTROL_MODULES,
  totalActive: 6,
  totalModules: 6,
};

export async function fetchControlData(): Promise<ControlPageData> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return MOCK_CONTROL_DATA;
}