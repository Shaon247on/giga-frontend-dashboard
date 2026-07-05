import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ExpenseDetailsView,
  fetchExpenseDetails,
} from "@/features/admin/expenses";
import { Skeleton } from "@/components/ui/skeleton";

interface ExpenseDetailsPageProps {
  params: Promise<{ id: string }>;
}

function ExpenseDetailsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <Skeleton className="h-4 w-32 rounded" />
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded-md mt-1" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-20 w-full rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 rounded-2xl" />
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-10 w-48 rounded-xl" />
      </div>
    </div>
  );
}

async function ExpenseDetailsContent({ params }: ExpenseDetailsPageProps) {
  const { id } = await params;
  const data = await fetchExpenseDetails(id);

  if (!data) {
    notFound();
  }

  return <ExpenseDetailsView data={data} />;
}

export default function ExpenseDetailsPage(props: ExpenseDetailsPageProps) {
  return (
    <Suspense fallback={<ExpenseDetailsSkeleton />}>
      <ExpenseDetailsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Expense Details",
};