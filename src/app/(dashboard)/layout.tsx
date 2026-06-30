import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardShell
      workspaceTitle="Supervisor Workspace"
      workspaceSubtitle="Operations management platform"
    >
      {children}
    </DashboardShell>
  );
}