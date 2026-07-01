import { Suspense } from "react";
import { VehiclesView, VehiclesSkeleton, fetchVehiclesPageData } from "@/features/supervisor/vehicles";

interface VehiclesPageProps {
  searchParams: Promise<{ vehicle?: string }>;
}

async function VehiclesContent({ searchParams }: VehiclesPageProps) {
  const sp = await searchParams;
  const selectedId = sp?.vehicle ?? null;

  const data = await fetchVehiclesPageData();

  return <VehiclesView data={data} selectedId={selectedId} />;
}

export default function VehiclesPage(props: VehiclesPageProps) {
  return (
    <Suspense fallback={<VehiclesSkeleton />}>
      <VehiclesContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Vehicle Maintenance",
  description: "Track repair requests and manage vehicle service status",
};