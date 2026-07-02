import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  VehicleDetailsView,
  VehicleDetailsSkeleton,
  fetchVehiclesPageData,
} from "@/features/admin/vehicles";

interface VehicleDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function VehicleDetailsContent({ params }: VehicleDetailsPageProps) {
  const { id } = await params;
  const data = await fetchVehiclesPageData();
  const vehicle = data.vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  // Filter data for this specific vehicle
  const fleetList = data.fleetList.filter((f) => f.vehicle === vehicle.vehicleNumber);
  const fuelReports = data.fuelReports.filter((f) => f.employee === vehicle.assignedDriver);
  const repairRequests = data.repairRequests;
  const oilChanges = data.oilChanges.filter((o) => o.id === vehicle.id);

  return (
    <VehicleDetailsView
      vehicle={vehicle}
      fleetList={fleetList}
      fuelReports={fuelReports}
      repairRequests={repairRequests}
      oilChanges={oilChanges}
    />
  );
}

export default function VehicleDetailsPage(props: VehicleDetailsPageProps) {
  return (
    <Suspense fallback={<VehicleDetailsSkeleton />}>
      <VehicleDetailsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Vehicle Details",
};