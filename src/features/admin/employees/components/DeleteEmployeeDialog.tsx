"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { Employee } from "../types";

interface DeleteEmployeeDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (employee: Employee) => void;
}

export function DeleteEmployeeDialog({
  employee,
  open,
  onOpenChange,
  onConfirm,
}: DeleteEmployeeDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!employee) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      onConfirm(employee);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <Trash2 className="w-6 h-6 text-btn-reject" />
          </div>
          <AlertDialogTitle className="text-[17px] font-bold text-primary-txt">
            Delete Employee
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] text-secondary-txt">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-primary-txt">
              {employee?.name}
            </span>
            ? This action cannot be undone and will remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className="h-11 px-6 rounded-xl bg-btn-reject text-white hover:brightness-90"
          >
            {loading ? "Deleting..." : "Delete Employee"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}