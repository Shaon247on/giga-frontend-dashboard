import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  EditVehiclePage,
  EditVehicleSkeleton,
  fetchVehiclesPageData,
} from "@/features/admin/vehicles";

interface EditVehiclePageProps {
  params: Promise<{ id: string }>;
}

async function EditVehicleContent({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const data = await fetchVehiclesPageData();
  const vehicle = data.vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  return <EditVehiclePage vehicle={vehicle} />;
}

export default function EditVehiclePageRoute(props: EditVehiclePageProps) {
  return (
    <Suspense fallback={<EditVehicleSkeleton />}>
      <EditVehicleContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Edit Vehicle",
};