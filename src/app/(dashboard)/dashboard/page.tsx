import { Suspense } from "react";
import { DashboardView, DashboardSkeleton, fetchDashboardData } from "@/features/dashboard";

// This is a Server Component — data fetching happens server-side
// When real API exists: swap fetchDashboardData() for a service call
async function DashboardContent() {
  const data = await fetchDashboardData();
  return <DashboardView data={data} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Dashboard — GTS's Finest",
  description: "Supervisor workspace — Operations management platform",
};