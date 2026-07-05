"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ControlModuleCard } from "./ControlModuleCard";
import type { ControlModule, ControlPageData } from "../types";

interface ControlViewProps {
  data: ControlPageData;
}

export function ControlView({ data }: ControlViewProps) {
  const [modules, setModules] = useState<ControlModule[]>(data.modules);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const totalModules = modules.length;
  const totalActive = modules.filter((m) => m.isEnabled).length;

  const handleToggle = async (id: string, enabled: boolean) => {
    setIsUpdating(id);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setModules((prev) =>
        prev.map((module) =>
          module.id === id ? { ...module, isEnabled: enabled } : module
        )
      );
    } catch (error) {
      console.error("Failed to update module:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">
          Control System
        </h1>
        <p className="text-sm text-secondary-txt mt-1">
          Turn modules on or off for your entire company
        </p>
      </div>

      {/* Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
        <div>
          <p className="text-[15px] font-bold text-blue-700">
            {totalActive} of {totalModules} modules active
          </p>
          <p className="text-[12px] text-blue-600 mt-0.5">
            Changes take effect immediately after saving
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="shrink-0 bg-blue-600 text-white hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((module) => (
          <ControlModuleCard
            key={module.id}
            module={module}
            onToggle={handleToggle}
            isUpdating={isUpdating === module.id}
          />
        ))}
      </div>

      {/* Footer Note */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-[12px] text-amber-700 leading-relaxed">
          <span className="font-semibold">Note:</span> Disabling a module hides it for all employees, supervisors, and staff. The owner always retains full access.
        </p>
      </div>
    </div>
  );
}