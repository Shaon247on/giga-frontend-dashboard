"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PUNCH_TYPE_LABELS } from "../constants";
import { fetchAttendanceRecord } from "../mocks/attendance.mock";
import { DetailPanelEmpty } from "./DetailPanelEmpty";
import type { AttendanceRecord } from "../types";

// A single state shape keyed by the id it belongs to.
// This avoids needing a separate "loading" flag that has to be
// set synchronously the moment the effect runs.
type FetchState =
  | { status: "idle" }
  | { status: "loading"; id: string }
  | { status: "loaded"; id: string; record: AttendanceRecord | null };

export function AttendanceDetailPanel() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("record");

  // Initialize state lazily based on current selectedId — no effect needed
  // just to "reset" state when there's nothing selected.
  const [state, setState] = useState<FetchState>(() =>
    selectedId ? { status: "loading", id: selectedId } : { status: "idle" }
  );

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    let cancelled = false;

    fetchAttendanceRecord(selectedId).then((data) => {
      if (cancelled) return;
      setState({ status: "loaded", id: selectedId, record: data });
    });

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  // Derive what to render purely from props + state — no setState here.
  // If selectedId changed since the last render but the effect for the new
  // id hasn't run yet, treat it as loading rather than showing stale data.
  if (!selectedId) {
    return <DetailPanelEmpty />;
  }

  if (state.status === "idle" || state.id !== selectedId) {
    return (
      <div className="flex items-center justify-center h-full min-h-[320px]">
        <Loader2 className="w-6 h-6 text-[#135CC8] animate-spin" />
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="flex items-center justify-center h-full min-h-[320px]">
        <Loader2 className="w-6 h-6 text-[#135CC8] animate-spin" />
      </div>
    );
  }

  if (!state.record) {
    return <DetailPanelEmpty />;
  }

  return <DetailContent record={state.record} />;
}

function DetailContent({ record }: { record: AttendanceRecord }) {
  const fields = [
    { icon: <Calendar className="w-3.5 h-3.5" />, label: "Date",         value: record.date },
    { icon: <Clock    className="w-3.5 h-3.5" />, label: "Hours",        value: record.hours > 0 ? record.hours.toFixed(2) : "—" },
    { icon: <Clock    className="w-3.5 h-3.5" />, label: "Clock In",     value: record.clockIn },
    { icon: <Clock    className="w-3.5 h-3.5" />, label: "Clock Out",    value: record.clockOut || <span className="text-emerald-600 font-semibold">Active</span> },
    { icon: <MapPin   className="w-3.5 h-3.5" />, label: "Type",         value: PUNCH_TYPE_LABELS[record.type], fullWidth: true },
    { icon: <User     className="w-3.5 h-3.5" />, label: "Current Status", value: <StatusBadge status={record.status} />, fullWidth: true },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header strip */}
      <div className="bg-[#135CC8] px-5 py-5 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-white/30"
            style={{ backgroundColor: record.avatarColor }}
          >
            <span className="text-[14px] font-bold text-white">{record.initials}</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-white leading-tight">{record.employeeName}</h2>
            <p className="text-[12px] text-blue-200 leading-tight mt-0.5 truncate">{record.location}</p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {fields.filter(f => !f.fullWidth).map((f, i) => (
            <FieldCard key={i} {...f} />
          ))}
        </div>
        {fields.filter(f => f.fullWidth).map((f, i) => (
          <FieldCard key={i} {...f} fullWidth />
        ))}
      </div>

      {/* CTA */}
      {record.status === "pending" && (
        <div className="px-4 pb-5 pt-2">
          <button className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
            "bg-[#135CC8] text-white text-[14px] font-semibold",
            "hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm"
          )}>
            <CheckCircle className="w-4 h-4" strokeWidth={2} />
            Mark as Reviewed
          </button>
        </div>
      )}
    </div>
  );
}

function FieldCard({ icon, label, value, fullWidth = false }: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn(
      "bg-slate-50/80 rounded-xl px-3.5 py-3 border border-slate-100",
      fullWidth && "col-span-2"
    )}>
      <div className="flex items-center gap-1.5 text-[#90A1B9] mb-1.5">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[14px] font-semibold text-[#0F172B] leading-tight">{value}</div>
    </div>
  );
}