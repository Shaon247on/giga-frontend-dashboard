export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
  avatarColor?: string;
}

export interface PageMeta {
  title: string;
  subtitle?: string;
}

export type Status =
  | "active"
  | "reviewed"
  | "pending"
  | "approved"
  | "rejected"
  | "flagged"
  | "open"
  | "in-progress"
  | "completed";