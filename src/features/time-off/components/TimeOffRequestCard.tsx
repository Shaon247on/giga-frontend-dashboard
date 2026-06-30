"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Plane, HeartPulse, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ApproveRequestDialog } from "./ApproveRequestDialog";
import { RejectRequestDialog } from "./RejectRequestDialog";
import { REQUEST_TYPE_LABELS, REQUEST_TYPE_BADGE_STYLES } from "../constants";
import {
  approveTimeOffRequest,
  rejectTimeOffRequest,
} from "../mocks/time-off.mock";
import type { TimeOffRequest } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TimeOffRequestCardProps {
  request: TimeOffRequest;
}

export function TimeOffRequestCard({ request }: TimeOffRequestCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVacation = request.requestType === "vacation";
  const TypeIcon = isVacation ? Plane : HeartPulse;

  const handleViewDetails = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("request", request.id);
    router.push(`/dashboard/time-off?${params.toString()}`, { scroll: false });
  }, [router, searchParams, request.id]);

  const handleApprove = useCallback(async () => {
    await approveTimeOffRequest(request.id);
    router.refresh();
  }, [request.id, router]);

  const handleReject = useCallback(
    async (reason: string) => {
      await rejectTimeOffRequest(request.id, reason);
      router.refresh();
    },
    [request.id, router],
  );

  const canReview =
    request.status === "pending" || request.status === "reviewed";

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="p-4">
        {/* Top row: avatar, name, dates, status badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Avatar / type icon */}
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                isVacation ? "bg-violet-50" : "bg-blue-50",
              )}
            >
              <TypeIcon
                className={cn(
                  "w-4.5 h-4.5",
                  isVacation ? "text-violet-500" : "text-blue-500",
                )}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-primary-txt leading-tight">
                {request.employeeName}
              </p>
              <p className="text-[12px] text-secondary-txt leading-tight mt-0.5">
                {request.startDate}
                {request.returnDate && <> → Return {request.returnDate}</>}
              </p>
            </div>
          </div>

          <StatusBadge status={request.status} className="flex-shrink-0" />
        </div>

        {/* Reason quote */}
        <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <p className="text-[13px] text-secondary-txt italic leading-snug">
            &ldquo;{request.reason}&rdquo;
          </p>
        </div>

        {/* Request type badge */}
        <div className="mt-3">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border",
              REQUEST_TYPE_BADGE_STYLES[request.requestType],
            )}
          >
            {REQUEST_TYPE_LABELS[request.requestType]}
          </span>
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100">
        <Link href={`/dashboard/time-off/${request.id}`}>
          <Button
            variant={"link"}
            onClick={handleViewDetails}
            //   className="flex items-center gap-1 text-[13px] font-semibold text-btn-secondary-txt hover:underline transition-colors"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
          </Button>
        </Link>

        <div className="flex-1" />

        {canReview && (
          <>
            <ApproveRequestDialog
              employeeName={request.employeeName}
              onConfirm={handleApprove}
            />
            <RejectRequestDialog
              employeeName={request.employeeName}
              onConfirm={handleReject}
            />
          </>
        )}
      </div>
    </div>
  );
}
