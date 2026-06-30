import { Suspense } from "react";
import { TimeOffView, TimeOffSkeleton, fetchTimeOffPageData } from "@/features/time-off";
import type { TimeOffFilter } from "@/features/time-off";

interface TimeOffPageProps {
  searchParams: Promise<{ filter?: string; request?: string }>;
}

async function TimeOffContent({ searchParams }: TimeOffPageProps) {
  const sp = await searchParams;
  const activeFilter = (sp?.filter ?? "all") as TimeOffFilter;

  const data = await fetchTimeOffPageData();

  return <TimeOffView data={data} activeFilter={activeFilter} />;
}

export default function TimeOffPage(props: TimeOffPageProps) {
  return (
    <Suspense fallback={<TimeOffSkeleton />}>
      <TimeOffContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Time Off Review",
  description: "Manage vacation requests and sick day submissions",
};