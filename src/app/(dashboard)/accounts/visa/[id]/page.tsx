import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  VisaDetailsView,
  VisaDetailsSkeleton,
  fetchVisaDetails,
} from "@/features/accounts/visa";

interface VisaDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function VisaDetailsContent({ params }: VisaDetailsPageProps) {
  const { id } = await params;
  const data = await fetchVisaDetails(id);

  if (!data) {
    notFound();
  }

  return <VisaDetailsView data={data} />;
}

export default function VisaDetailsPage(props: VisaDetailsPageProps) {
  return (
    <Suspense fallback={<VisaDetailsSkeleton />}>
      <VisaDetailsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Visa Expense Details",
};