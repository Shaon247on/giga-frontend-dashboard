import { Suspense } from "react";
import {
  AdminDashboardView,
  AdminDashboardSkeleton,
  fetchAdminDashboardData,
} from "@/features/admin/dashboard";

async function AdminDashboardContent() {
  const data = await fetchAdminDashboardData();
  return <AdminDashboardView data={data} />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Admin Dashboard",
};