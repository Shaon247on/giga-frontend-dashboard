import { Suspense } from "react";
import {
  ExpensesTabs,
  ExpensesPageHeader,
  ExpensesPageSkeleton,
  fetchExpensesPageData,
} from "@/features/admin/expenses";

interface ExpensesPageProps {
  searchParams: Promise<{
    tab?: string;
    "personal-status"?: string;
    "visa-status"?: string;
    "personal-search"?: string;
    "visa-search"?: string;
    page?: string;
  }>;
}

async function ExpensesContent({ searchParams }: ExpensesPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchExpensesPageData();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header with Stats */}
      <ExpensesPageHeader data={data} />

      {/* Tabs with Tables */}
      <ExpensesTabs
        personalExpenses={data.personalExpenses}
        visaExpenses={data.visaExpenses}
        currentPage={page}
      />
    </div>
  );
}

export default function ExpensesPage(props: ExpensesPageProps) {
  return (
    <Suspense fallback={<ExpensesPageSkeleton />}>
      <ExpensesContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Expense Management",
};