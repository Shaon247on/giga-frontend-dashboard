"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FieldSet,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { createEmployeeSchema, type CreateEmployeeFormData } from "../schemas";

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateEmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Employee",
      vehicle: "",
      phone: "",
      emergencyContact: "",
      notes: "",
    },
  });

  const role = watch("role");

  const onSubmit = async (data: CreateEmployeeFormData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await addEmployee(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Employee data:", data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Failed to add employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button size={"lg"} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 rounded-2xl p-0 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-[17px] font-bold text-primary-txt">
                Add Employee
              </DialogTitle>
              <DialogDescription className="text-[13px] text-secondary-txt">
                Add a new employee to the system
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form Body */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <FieldSet>
              <FieldGroup>
                {/* Full Name */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="John Smith"
                    className={cn(
                      "h-11",
                      errors.name && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>

                {/* Email */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@company.com"
                    className={cn(
                      "h-11",
                      errors.email && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                {/* Role */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Select
                    value={role}
                    onValueChange={(value) =>
                      setValue("role", value as "Employee" | "Supervisor" | "Admin")
                    }
                  >
                    <SelectTrigger
                      id="role"
                      className={cn(
                        "h-11",
                        errors.role && "border-btn-reject focus-visible:ring-btn-reject/20"
                      )}
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <FieldError>{errors.role.message}</FieldError>
                  )}
                </Field>

                {/* Vehicle (Optional) */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="vehicle">
                    Assign Vehicle{" "}
                    <span className="font-normal text-secondary-txt">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="vehicle"
                    {...register("vehicle")}
                    placeholder="Van #12"
                    className="h-11"
                  />
                </Field>

                {/* Phone (Optional) */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="phone">
                    Phone Number{" "}
                    <span className="font-normal text-secondary-txt">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+1 (613) 555-0192"
                    className="h-11"
                  />
                </Field>

                {/* Emergency Contact (Optional) */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="emergencyContact">
                    Emergency Contact{" "}
                    <span className="font-normal text-secondary-txt">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="emergencyContact"
                    {...register("emergencyContact")}
                    placeholder="Olivia Rivera"
                    className="h-11"
                  />
                </Field>

                {/* Notes (Optional) */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="notes">
                    Notes{" "}
                    <span className="font-normal text-secondary-txt">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="Add any additional notes..."
                    className="min-h-20 resize-none"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-btn-primary text-btn-primary-txt hover:brightness-90"
              >
                {loading ? "Saving..." : "Save & Invite"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}