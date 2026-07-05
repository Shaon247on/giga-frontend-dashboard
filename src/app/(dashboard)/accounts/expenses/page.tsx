import { Suspense } from "react";
import {
  AccountsExpensesView,
  AccountsExpensesSkeleton,
  fetchExpensesPageData,
} from "@/features/accounts/expenses";

interface AccountsExpensesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    type?: string;
    page?: string;
  }>;
}

async function AccountsExpensesContent({ searchParams }: AccountsExpensesPageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10);

  const data = await fetchExpensesPageData();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Personal Expenses
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Review and process employee reimbursement submissions
        </p>
      </div>

      {/* View with Table */}
      <AccountsExpensesView
        expenses={data.expenses}
        currentPage={page}
      />
    </div>
  );
}

export default function AccountsExpensesPage(props: AccountsExpensesPageProps) {
  return (
    <Suspense fallback={<AccountsExpensesSkeleton />}>
      <AccountsExpensesContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Personal Expenses",
};