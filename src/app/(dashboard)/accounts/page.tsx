import { Suspense } from "react";
import {
  AccountsDashboardView,
  AccountsDashboardSkeleton,
  fetchAccountsDashboardData,
} from "@/features/accounts/dashboard";

async function AccountsDashboardContent() {
  const data = await fetchAccountsDashboardData();
  return <AccountsDashboardView data={data} />;
}

export default function AccountsDashboardPage() {
  return (
    <Suspense fallback={<AccountsDashboardSkeleton />}>
      <AccountsDashboardContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Accounting Dashboard",
};