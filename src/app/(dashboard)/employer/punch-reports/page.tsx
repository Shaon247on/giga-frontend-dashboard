import { Suspense } from "react";
import {
  PunchReportsView,
  fetchPunchReportsData,
} from "@/features/employer/punch-reports";
import PunchReportsSkeleton from "@/features/employer/punch-reports/components/PunchReportsSkeleton";


interface PunchReportsPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    status?: string;
    page?: string;
  }>;
}

async function PunchReportsContent({ searchParams }: PunchReportsPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const data = await fetchPunchReportsData();
  return <PunchReportsView data={data} currentPage={page} />;
}

export default function PunchReportsPage(props: PunchReportsPageProps) {
  return (
    <Suspense fallback={<PunchReportsSkeleton />}>
      <PunchReportsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Punch & Time Off Reports",
};