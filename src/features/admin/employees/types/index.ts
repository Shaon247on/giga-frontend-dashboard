export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Employee" | "Supervisor" | "Admin";
  vehicle: string;
  status: "active" | "inactive";
  initials: string;
  avatarColor: string;
  phone?: string;
  emergencyContact?: string;
  notes?: string;
}

export interface EmployeesPageData {
  employees: Employee[];
  totalCount: number;
}

export interface CreateEmployeeData {
  name: string;
  email: string;
  role: "Employee" | "Supervisor" | "Admin";
  vehicle?: string;
  phone?: string;
  emergencyContact?: string;
  notes?: string;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: string;
  status?: "active" | "inactive";
}