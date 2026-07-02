"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, Check, X } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { Column, Action } from "@/components/shared/data-table";
import type { TimeOffRequest } from "../types";
import { ViewTimeOffDialog } from "./ViewTimeOffDialog";
import { ApproveTimeOffDialog } from "./ApproveTimeOffDialog";
import { RejectTimeOffDialog } from "./RejectTimeOffDialog";
import { cn } from "@/lib/utils";

interface TimeOffTableProps {
  data: TimeOffRequest[];
  totalItems: number;
  currentPage: number;
}

export function TimeOffTable({ data, totalItems, currentPage }: TimeOffTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TimeOffRequest | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      vacation: "Vacation",
      sick: "Sick Leave",
      personal: "Personal",
      other: "Other",
    };
    return map[type] || type;
  };

  const columns: Column<TimeOffRequest>[] = [
    {
      key: "employeeName",
      header: "Employee",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: item.avatarColor }}
          >
            <span className="text-[11px] font-bold text-white">{item.initials}</span>
          </div>
          <span className="font-medium text-primary-txt">{item.employeeName}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (item) => (
        <span className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
          item.type === "vacation" && "bg-blue-50 text-blue-600",
          item.type === "sick" && "bg-red-50 text-red-600",
          item.type === "personal" && "bg-amber-50 text-amber-600",
          item.type === "other" && "bg-slate-50 text-slate-600",
        )}>
          {getTypeLabel(item.type)}
        </span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      cell: (item) => <span className="text-primary-txt">{item.startDate}</span>,
    },
    {
      key: "endDate",
      header: "End Date",
      cell: (item) => <span className="text-primary-txt">{item.endDate}</span>,
    },
    {
      key: "reason",
      header: "Reason",
      cell: (item) => (
        <span className="text-secondary-txt truncate max-w-37.5 block">
          {item.reason}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
  ];

  const actions: Action<TimeOffRequest>[] = [
    {
      label: "View",
      icon: <Eye className="w-3.5 h-3.5" />,
      onClick: (item) => {
        setSelectedRequest(item);
        setViewDialogOpen(true);
      },
      variant: "outline",
      size: "sm",
    },
    {
      label: "Approve",
      icon: <Check className="w-3.5 h-3.5" />,
      onClick: (item) => {
        setSelectedRequest(item);
        setApproveDialogOpen(true);
      },
      variant: "accept",
      size: "sm",
      disabled: (item) => item.status !== "pending",
    },
    {
      label: "Reject",
      icon: <X className="w-3.5 h-3.5" />,
      onClick: (item) => {
        setSelectedRequest(item);
        setRejectDialogOpen(true);
      },
      variant: "reject-soft",
      size: "sm",
      disabled: (item) => item.status !== "pending",
    },
  ];

  const handleApprove = (request: TimeOffRequest) => {
    console.log("Approved:", request);
    setApproveDialogOpen(false);
    // TODO: Update status and refresh
  };

  const handleReject = (request: TimeOffRequest, reason: string) => {
    console.log("Rejected:", request, "Reason:", reason);
    setRejectDialogOpen(false);
    // TODO: Update status and refresh
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        actions={actions}
        keyExtractor={(item) => item.id}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        showPagination={true}
        showRecordCount={true}
        emptyMessage="No time off requests found"
      />

      {/* Dialogs */}
      <ViewTimeOffDialog
        request={selectedRequest}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <ApproveTimeOffDialog
        request={selectedRequest}
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApprove}
      />

      <RejectTimeOffDialog
        request={selectedRequest}
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onConfirm={handleReject}
      />
    </>
  );
}