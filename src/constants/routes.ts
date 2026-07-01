export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  forgotPassword: "/forgot-password",
  verifyOtp: "/verify-otp",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  attendance: "/dashboard/attendance",
  attendanceRecord: (id: string) => `/dashboard/attendance/${id}`,
  timeOff: "/dashboard/time-off",
  timeOffRequest: (id: string) => `/dashboard/time-off/${id}`,
  vehicles: "/dashboard/vehicles",
  settings: "/dashboard/settings",
  notifications: "/dashboard/notifications",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
