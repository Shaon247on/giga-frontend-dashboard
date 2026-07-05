import { Suspense } from "react";
import {
  ReportsView,
  ReportsSkeleton,
  fetchReportsPageData,
} from "@/features/accounts/reports";

async function ReportsContent() {
  const data = await fetchReportsPageData();
  return <ReportsView data={data} />;
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Reports",
};