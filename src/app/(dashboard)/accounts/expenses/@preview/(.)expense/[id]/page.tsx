"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExpensePreviewDialog } from "@/features/accounts/expenses";
import { fetchExpensePreview } from "@/features/accounts/expenses/mocks/expenses.mock";
import type { ExpensePreviewData } from "@/features/accounts/expenses";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const router = useRouter();
  const [data, setData] = useState<ExpensePreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchExpensePreview(id || "");
        setData(result);
      } catch (error) {
        console.error("Failed to fetch expense preview:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Close the dialog by navigating back
      router.back();
    }
  };

  const handleReject = (expenseId: string, reason: string) => {
    console.log("Rejected expense:", expenseId, "Reason:", reason);
    // TODO: Update status and refresh
    router.back();
  };

  const handleMarkReimbursed = (expenseId: string) => {
    console.log("Marked as reimbursed:", expenseId);
    // TODO: Update status and refresh
    router.back();
  };

  if (loading) {
    return (
      <ExpensePreviewDialog
        data={null}
        open={true}
        onOpenChange={handleOpenChange}
        loading={true}
      />
    );
  }

  return (
    <ExpensePreviewDialog
      data={data}
      open={true}
      onOpenChange={handleOpenChange}
      onReject={handleReject}
      onMarkReimbursed={handleMarkReimbursed}
    />
  );
}