"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Key, UserX, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import type { Employee } from "../types";

interface EmployeeDetailsViewProps {
  employee: Employee;
}

export function EmployeeDetailsView({ employee }: EmployeeDetailsViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone || "",
    emergencyContact: employee.emergencyContact || "",
    role: employee.role,
    notes: employee.notes || "",
  });

  const handleBack = () => {
    router.push("/admin/employees");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
      // Show success toast here
    } catch (error) {
      console.error("Failed to save employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    console.log("Send password reset for:", employee.id);
    // Show confirmation dialog
  };

  const handleDeactivate = () => {
    console.log("Deactivate employee:", employee.id);
    // Show confirmation dialog
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-secondary-txt hover:text-primary-txt transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to employees
      </button>

      {/* Header */}
      <div className="flex items-start justify-between bg-card p-5 rounded-xl">
        <div className="flex items-center gap-4 ">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: employee.avatarColor }}
          >
            <span className="text-2xl font-bold text-white">
              {employee.initials}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              {employee.name}
            </h1>
            <p className="text-sm text-secondary-txt mt-0.5">
              Edit employee profile. Update role, contact, vehicle assignment
              and access status.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={employee.status} />
        </div>
      </div>

      {/* Form */}
      <div className="flex items-start justify-center gap-6">
        <div className="bg-white flex-1 rounded-2xl border border-slate-200/60 shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-11"
                />
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-11"
                />
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (613) 555-0192"
                  className="h-11"
                />
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.phone || "—"}
                </p>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Emergency Contact
              </Label>
              {isEditing ? (
                <Input
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleChange("emergencyContact", e.target.value)
                  }
                  placeholder="Olivia Rivera"
                  className="h-11"
                />
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.emergencyContact || "—"}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Role
              </Label>
              {isEditing ? (
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    handleChange(
                      "role",
                      value as "Employee" | "Supervisor" | "Admin",
                    )
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.role}
                </p>
              )}
            </div>

            {/* Vehicle (full width on edit) */}
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Vehicle Assignment
              </Label>
              {isEditing ? (
                <Input
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Van #12"
                  className="h-11"
                />
              ) : (
                <p className="text-[14px] font-medium text-primary-txt py-2">
                  {employee.vehicle || "—"}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
                Notes
              </Label>
              {isEditing ? (
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Add any additional notes..."
                  className={cn(
                    "flex min-h-20 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3",
                    "text-[13px] text-primary-txt placeholder:text-table-header",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/30 focus-visible:border-btn-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                  )}
                />
              ) : (
                <p className="text-[14px] text-primary-txt py-2 leading-relaxed">
                  {employee.notes || "No notes added"}
                </p>
              )}
            </div>
          </div>

          {/* Edit Actions */}
          {!isEditing ? (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-slate-200 hover:bg-slate-50 text-end"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="border-slate-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-btn-primary text-btn-primary-txt hover:brightness-90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

        {/* Access Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
          <h3 className="text-[15px] font-bold text-primary-txt mb-4">
            Access Controls
          </h3>
          <div className="flex-col flex gap-2 ">
            <Button
              variant="outline"
              onClick={handleResetPassword}
              className="border-slate-200 hover:bg-slate-50"
            >
              <Key className="w-4 h-4 mr-2" />
              Send Password Reset
            </Button>
            <Button
              variant="outline"
              onClick={handleDeactivate}
              className="border-red-200 text-btn-reject hover:bg-red-50 hover:border-red-300"
            >
              <UserX className="w-4 h-4 mr-2" />
              Deactivate Employee
            </Button>
          </div>
        </div>
      </div>

      {/* Audit Trail Note */}
      <div className="flex items-center gap-2 text-xs text-secondary-txt bg-slate-50 rounded-xl px-4 py-3">
        <AlertCircle className="w-3.5 h-3.5" />
        All edits are logged in the admin audit trail.
      </div>
    </div>
  );
}
