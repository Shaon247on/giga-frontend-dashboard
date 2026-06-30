"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ApproveRequestDialog } from "./ApproveRequestDialog";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  REQUEST_TYPE_LABELS,
  COVERAGE_RISK_LABELS,
  COVERAGE_RISK_STYLES,
} from "../constants";
import { approveTimeOffRequest, rejectTimeOffRequest } from "../mocks/time-off.mock";
import { ROUTES } from "@/constants/routes";
import type { TimeOffRequest } from "../types";

interface TimeOffDetailViewProps {
  request: TimeOffRequest;
}

export function TimeOffDetailView({ request }: TimeOffDetailViewProps) {
  const router = useRouter();
  const [note, setNote] = useState("");

  const isVacation = request.requestType === "vacation";
  const canReview = request.status === "pending" || request.status === "reviewed";

  const handleApprove = useCallback(async () => {
    await approveTimeOffRequest(request.id, note);
    router.push(ROUTES.timeOff);
    router.refresh();
  }, [request.id, note, router]);

  const handleReject = useCallback(
    async (reason: string) => {
      await rejectTimeOffRequest(request.id, reason);
      router.push(ROUTES.timeOff);
      router.refresh();
    },
    [request.id, router]
  );

  return (
    <div className="space-y-4">
      {/* Back link */}
      <Link
        href={ROUTES.timeOff}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-primary-txt hover:text-btn-primary transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
        Back to review
      </Link>

      {/* Detail card */}
      <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h1 className="text-[19px] font-bold text-primary-txt leading-tight">
            {isVacation ? "Vacation" : "Sick Day"} approval details
          </h1>
          <StatusBadge status={request.status} className="shrink-0" />
        </div>
        <p className="text-[13px] text-secondary-txt mb-5">
          Review complete request before approving or rejecting.
        </p>

        {/* Field grid */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Employee" value={request.employeeName} />
          <Field label="Request Type" value={REQUEST_TYPE_LABELS[request.requestType]} />
          <Field label="Start Date" value={request.startDate} />
          <Field label="Return Date" value={request.returnDate ?? "—"} />
          <Field label="Reason" value={request.reason} />
          <Field
            label="Coverage Risk"
            value={
              <span className={COVERAGE_RISK_STYLES[request.coverageRisk]}>
                {COVERAGE_RISK_LABELS[request.coverageRisk]}
              </span>
            }
          />
        </div>

        {/* Supervisor note */}
        <div className="mt-5 space-y-1.5">
          <label className="text-[13px] font-semibold text-primary-txt">Supervisor note</label>
          <Textarea
            placeholder="Add approval or rejection context..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Actions */}
        {canReview && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <ApproveRequestDialog employeeName={request.employeeName} onConfirm={handleApprove}>
              <Button variant="accept" size="lg" className="min-w-35">
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
            </ApproveRequestDialog>

            <RejectRequestDialog employeeName={request.employeeName} onConfirm={handleReject}>
              <Button variant="reject-soft" size="lg" className="min-w-35">
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            </RejectRequestDialog>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Field sub-component ──────────────────────────────────
function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100">
      <p className="text-[10px] font-semibold text-table-header uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-[14px] font-semibold text-primary-txt leading-tight">{value}</p>
    </div>
  );
}