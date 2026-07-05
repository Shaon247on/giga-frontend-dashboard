import { Suspense } from "react";
import {
  VisaExpensesView,
  VisaExpensesSkeleton,
  fetchVisaPageData,
} from "@/features/accounts/visa";

interface VisaPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

async function VisaContent({ searchParams }: VisaPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchVisaPageData();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <VisaExpensesView
        expenses={data.expenses}
        currentPage={page}
      />
    </div>
  );
}

export default function VisaPage(props: VisaPageProps) {
  return (
    <Suspense fallback={<VisaExpensesSkeleton />}>
      <VisaContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Visa / Company Card",
};