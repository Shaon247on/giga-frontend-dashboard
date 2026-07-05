import { Suspense } from "react";
import {
  VehicleReportsView,
  fetchVehicleReportsData,
} from "@/features/employer/vehicle-reports";
import { Skeleton } from "@/components/ui/skeleton";

function VehicleReportsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <Skeleton className="w-45 h-11 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
      <Skeleton className="h-11 max-w-sm rounded-xl" />
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}

interface VehicleReportsPageProps {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

async function VehicleReportsContent({ searchParams }: VehicleReportsPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const data = await fetchVehicleReportsData();
  return <VehicleReportsView data={data} currentPage={page} />;
}

export default function VehicleReportsPage(props: VehicleReportsPageProps) {
  return (
    <Suspense fallback={<VehicleReportsSkeleton />}>
      <VehicleReportsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Vehicle Reports",
};