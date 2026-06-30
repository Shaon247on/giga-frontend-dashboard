"use client";

import { type ReactNode } from "react";
import { Header } from "./Header";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { Sidebar } from "./Sidebar";

interface DashboardShellProps {
  children: ReactNode;
  workspaceTitle?: string;
  workspaceSubtitle?: string;
}

export function DashboardShell({
  children,
  workspaceTitle,
  workspaceSubtitle,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      {/*
        Full viewport height grid:
        - Desktop: sidebar (20%) | main (80%)
        - Tablet/Mobile: sidebar slides over content
      */}
      <div className="flex h-screen overflow-hidden bg-surface">
        {/* Sidebar: 20% width on desktop */}
        <div className="hidden lg:flex lg:w-[20%] lg:min-w-60 lg:max-w-75 shrink-0">
          <Sidebar />
        </div>

        {/* Mobile sidebar — always rendered, visibility via transform */}
        <div className="lg:hidden">
          <Sidebar />
        </div>

        {/* Main column: header (sticky) + scrollable content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header
            workspaceTitle={workspaceTitle}
            workspaceSubtitle={workspaceSubtitle}
          />

          {/* Only this area scrolls */}
          <main
            className="flex-1 overflow-y-auto"
            id="main-content"
            tabIndex={-1}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
