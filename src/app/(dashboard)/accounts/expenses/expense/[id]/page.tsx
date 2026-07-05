import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ExpenseDetailsView, fetchExpensePreview } from "@/features/accounts/expenses";
import { Skeleton } from "@/components/ui/skeleton";

interface ExpenseDetailsPageProps {
  params: Promise<{ id: string }>;
}

function ExpenseDetailsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-8xl mx-auto space-y-6">
      <Skeleton className="h-4 w-32 rounded" />
      <Skeleton className="h-8 w-48 rounded-lg" />
      <div className="grid grid-cols-2 gap-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-4 w-24 rounded mt-1" />
          </div>
        ))}
      </div>
      <Skeleton className="w-full aspect-4/3 rounded-xl" />
    </div>
  );
}

async function ExpenseDetailsContent({ params }: ExpenseDetailsPageProps) {
  const { id } = await params;
  const data = await fetchExpensePreview(id);

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