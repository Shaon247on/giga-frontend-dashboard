import { Suspense } from "react";
import {
  EmployerDashboardView,
  EmployerDashboardSkeleton,
  fetchEmployerDashboard,
} from "@/features/employer/dashboard";

async function EmployerDashboardContent() {
  const data = await fetchEmployerDashboard();
  return <EmployerDashboardView data={data} />;
}

export default function EmployerDashboardPage() {
  return (
    <Suspense fallback={<EmployerDashboardSkeleton />}>
      <EmployerDashboardContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Owner Dashboard — GTS's Finest",
  description: "FieldOps Operations overview",
};