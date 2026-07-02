export const ROUTES = {
  // Auth
  home: "/",
  signIn: "/sign-in",
  forgotPassword: "/forgot-password",
  verifyOtp: "/verify-otp",
  resetPassword: "/reset-password",
  
  // Supervisor Routes
  dashboard: "/dashboard",
  attendance: "/dashboard/attendance",
  attendanceRecord: (id: string) => `/dashboard/attendance/${id}`,
  timeOff: "/dashboard/time-off",
  timeOffRequest: (id: string) => `/dashboard/time-off/${id}`,
  vehicles: "/dashboard/vehicles",
  settings: "/dashboard/settings",
  notifications: "/dashboard/notifications",
  
  // Admin Routes
  admin: "/admin",
  adminEmployees: "/admin/employees",
  adminEmployee: (id: string) => `/admin/employees/${id}`,
  adminEmployeeEdit: (id: string) => `/admin/employees/${id}/edit`,
  adminVehicles: "/admin/vehicles",
  adminVehicle: (id: string) => `/admin/vehicles/${id}`,
  adminVehicleEdit: (id: string) => `/admin/vehicles/${id}/edit`,
  adminAttendance: "/admin/attendance",
  adminTimeOff: "/admin/time-off",
  adminExpenses: "/admin/expenses",
  
  // Accounts Routes
  accounts: "/accounts",
  accountsExpenses: "/accounts/expenses",
  accountsCards: "/accounts/cards",
  accountsReports: "/accounts/reports",
  
  // Employer Routes
  employer: "/employer",
  employerOverview: "/employer/overview",
  employerVehicleReports: "/employer/vehicle-reports",
  employerPunchReports: "/employer/punch-reports",
  employerExpenseReports: "/employer/expense-reports",
  employerControl: "/employer/control",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];