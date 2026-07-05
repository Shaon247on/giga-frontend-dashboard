import { Suspense } from "react";
import {
  ExpenseReportsView,
  fetchExpenseReportsData,
} from "@/features/employer/overview/components/expense-reports";
import { Skeleton } from "@/components/ui/skeleton";

function ExpenseReportsSkeleton() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="flex-1 max-w-sm h-11 rounded-xl" />
        <Skeleton className="w-45 h-11 rounded-xl" />
        <Skeleton className="w-45 h-11 rounded-xl" />
      </div>
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}

interface ExpenseReportsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    type?: string;
    page?: string;
  }>;
}

async function ExpenseReportsContent({
  searchParams,
}: ExpenseReportsPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);
  const data = await fetchExpenseReportsData();
  return <ExpenseReportsView data={data} currentPage={page} />;
}

export default function ExpenseReportsPage(props: ExpenseReportsPageProps) {
  return (
    <Suspense fallback={<ExpenseReportsSkeleton />}>
      <ExpenseReportsContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Expense Reports",
};
