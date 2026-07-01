import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  TimeOffDetailView,
  TimeOffDetailSkeleton,
  fetchTimeOffRequest,
} from "@/features/supervisor/time-off";

interface TimeOffDetailPageProps {
  params: Promise<{ id: string }>;
}

async function TimeOffDetailContent({ params }: TimeOffDetailPageProps) {
  const { id } = await params;
  const request = await fetchTimeOffRequest(id);

  if (!request) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <TimeOffDetailView request={request} />
    </div>
  );
}

export default function TimeOffDetailPage(props: TimeOffDetailPageProps) {
  return (
    <Suspense fallback={<TimeOffDetailSkeleton />}>
      <TimeOffDetailContent {...props} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: TimeOffDetailPageProps) {
  const { id } = await params;
  const request = await fetchTimeOffRequest(id);
  return {
    title: request
      ? `${request.employeeName} — Time Off Review`
      : "Request Not Found",
  };
}