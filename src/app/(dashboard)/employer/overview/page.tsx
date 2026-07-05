import { Suspense } from "react";
import {
  OverviewView,
  OverviewSkeleton,
  fetchOverviewData,
} from "@/features/employer/overview";

async function OverviewContent() {
  const data = await fetchOverviewData();
  return <OverviewView data={data} />;
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <OverviewContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Overview",
};