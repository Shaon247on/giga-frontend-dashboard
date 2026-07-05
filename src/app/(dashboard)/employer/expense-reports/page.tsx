import { Suspense } from "react";
import {
  ExpenseReportsView,
  ExpenseReportsSkeleton,
  fetchExpenseReportsData,
} from "@/features/employer/expense-reports";

interface ExpenseReportsPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    status?: string;
    page?: string;
  }>;
}

async function ExpenseReportsContent({ searchParams }: ExpenseReportsPageProps) {
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