export type EmployeeRole = "Employee" | "Supervisor" | "Admin" | "Accounting";

export interface RosterEmployee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: EmployeeRole;
  email: string;
  vehicle: string | null;
  todayPunch: string | null;
  isActive: boolean;
}

export interface RosterPageData {
  employees: RosterEmployee[];
  totalCount: number;
  roleCounts: {
    employee: number;
    supervisor: number;
    admin: number;
    accounting: number;
  };
}