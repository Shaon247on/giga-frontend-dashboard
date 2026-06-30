"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Car,
  Loader2,
  CheckCircle,
  Wrench,
} from "lucide-react"
import { fetchMaintenanceRequest } from "../mocks/vehicles.mock";
import { VehicleDetailEmpty } from "./VehicleDetailEmpty";
import type { MaintenanceRequest } from "../types";
import { Button } from "@/components/ui/button";

type FetchState =
  | { status: "idle" }
  | { status: "loading"; id: string }
  | { status: "loaded"; id: string; request: MaintenanceRequest | null };

export function VehicleDetailPanel() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("vehicle");

  const [state, setState] = useState<FetchState>(() =>
    selectedId ? { status: "loading", id: selectedId } : { status: "idle" },
  );

  useEffect(() => {
    if (!selectedId) return;

    let cancelled = false;

    fetchMaintenanceRequest(selectedId).then((data) => {
      if (cancelled) return;
      setState({ status: "loaded", id: selectedId, request: data });
    });

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  // ── Derived render branches ──
  if (!selectedId) return <VehicleDetailEmpty />;

  if (
    state.status === "idle" ||
    state.id !== selectedId ||
    state.status === "loading"
  ) {
    return (
      <div className="flex items-center justify-center h-full min-h-80">
        <Loader2 className="w-6 h-6 text-btn-primary animate-spin" />
      </div>
    );
  }

  if (!state.request) return <VehicleDetailEmpty />;

  return <DetailContent request={state.request} />;
}

function DetailContent({ request }: { request: MaintenanceRequest }) {
  const fields = [
    {
      icon: <Car className="w-3.5 h-3.5" />,
      label: "Vehicle",
      value: request.vehicleLabel,
    },
    {
      icon: <User className="w-3.5 h-3.5" />,
      label: "Reported By",
      value: request.reportedBy,
    },
    {
      icon: <Calendar className="w-3.5 h-3.5" />,
      label: "Reported Date",
      value: request.reportedDate,
    },
    {
      icon: <Calendar className="w-3.5 h-3.5" />,
      label: "Resolved Date",
      value: request.resolvedDate ?? "—",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header strip */}
      <div className="bg-[#121B2F] px-5 py-5 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border-2 border-white/30">
            <Wrench className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-white leading-tight">
              {request.vehicleLabel}
            </h2>
            <p className={`text-[12px] py-0.5 px-1 rounded-full mt-1 ${request.status === "open" ? "bg-[#F9731633] text-[#F97316]" : request.status === "in-progress" ? "bg-[#0EA5E933] text-[#0EA5E9]" : "bg-[#10B98133] text-[#10B981]"} leading-tight flex items-center justify-center gap-2`}>
              <span
                className={`rounded-full size-2 ${request.status === "open" ? "bg-[#F97316] text-[#F97316]" : request.status === "in-progress" ? "bg-[#0EA5E9] text-[#0EA5E9]" : "bg-[#10B981]"} text-[#10B981]`}
              />
              {request.status}
            </p>
          </div>
        </div>
      </div>

      {/* Issue + status */}
      <div className="p-4 space-y-3">
        <div className="bg-[#FFF7ED] border border-[#FFEDD4] rounded-lg p-3">
            <h4 className="text-[#F54900] font-semibold">Problem Reported</h4>
          <p className="text-sm font-semibold text-primary-txt leading-snug">
            {request.issue}
          </p>
        </div>

          {/* <StatusBadge status={request.status} className="shrink-0" /> */}
        {request.notes && (
          <div className="px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <p className="text-[13px] text-secondary-txt italic leading-snug">
              &ldquo;{request.notes}&rdquo;
            </p>
          </div>
        )}

        {/* Fields */}
        <div className="grid grid-cols-2 gap-2">
          {fields.map((field, i) => (
            <div
              key={i}
              className="bg-slate-50/80 rounded-xl px-3.5 py-3 border border-slate-100"
            >
              <div className="flex items-center gap-1.5 text-table-header mb-1.5">
                {field.icon}
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {field.label}
                </span>
              </div>
              <div className="text-[14px] font-semibold text-primary-txt leading-tight">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {request.status !== "completed" && (
        <div className="px-4 pb-5 pt-2 mt-auto text-center">
          <Button
            variant={request.status === "open" ? "default" : "accept"}
            className="w-full py-6"
          >
            <CheckCircle className="w-4 h-4" strokeWidth={2} />
            {request.status === "open"
              ? "Mark In Progress"
              : "Mark as Completed"}
          </Button>
        </div>
      )}
    </div>
  );
}
