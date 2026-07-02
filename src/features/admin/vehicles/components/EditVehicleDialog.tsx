"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldSet,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { createVehicleSchema, type CreateVehicleFormData } from "../schemas";
import type { Vehicle } from "../types";

interface EditVehicleDialogProps {
  vehicle: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditVehicleDialog({
  vehicle,
  open,
  onOpenChange,
}: EditVehicleDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateVehicleFormData>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      vehicleNumber: vehicle.vehicleNumber,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      plateNumber: vehicle.plateNumber,
      vin: vehicle.vin,
      currentMileage: vehicle.currentMileage,
      lastOilChangeMileage: vehicle.lastOilChangeMileage,
      insuranceExpiry: vehicle.insuranceExpiry,
      assignedDriver: vehicle.assignedDriver,
    },
  });

  const onSubmit = async (data: CreateVehicleFormData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Update vehicle data:", { id: vehicle.id, ...data });
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl p-0 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-[17px] font-bold text-primary-txt">
                Edit Vehicle
              </DialogTitle>
              <DialogDescription className="text-[13px] text-secondary-txt">
                Update vehicle information and compliance details.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form Body */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <FieldSet>
              <FieldGroup>
                {/* Vehicle Number */}
                <Field>
                  <FieldLabel htmlFor="vehicleNumber">Vehicle Number</FieldLabel>
                  <Input
                    id="vehicleNumber"
                    {...register("vehicleNumber")}
                    placeholder="VH-001"
                    className={cn(
                      "h-11",
                      errors.vehicleNumber && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.vehicleNumber && (
                    <FieldError>{errors.vehicleNumber.message}</FieldError>
                  )}
                </Field>

                {/* Make */}
                <Field>
                  <FieldLabel htmlFor="make">Make</FieldLabel>
                  <Input
                    id="make"
                    {...register("make")}
                    placeholder="Ford"
                    className={cn(
                      "h-11",
                      errors.make && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.make && (
                    <FieldError>{errors.make.message}</FieldError>
                  )}
                </Field>

                {/* Model */}
                <Field>
                  <FieldLabel htmlFor="model">Model</FieldLabel>
                  <Input
                    id="model"
                    {...register("model")}
                    placeholder="Transit"
                    className={cn(
                      "h-11",
                      errors.model && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.model && (
                    <FieldError>{errors.model.message}</FieldError>
                  )}
                </Field>

                {/* Year */}
                <Field>
                  <FieldLabel htmlFor="year">Year</FieldLabel>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    placeholder="2024"
                    className={cn(
                      "h-11",
                      errors.year && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.year && (
                    <FieldError>{errors.year.message}</FieldError>
                  )}
                </Field>

                {/* Plate Number */}
                <Field>
                  <FieldLabel htmlFor="plateNumber">Plate Number</FieldLabel>
                  <Input
                    id="plateNumber"
                    {...register("plateNumber")}
                    placeholder="ABC-1234"
                    className={cn(
                      "h-11",
                      errors.plateNumber && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.plateNumber && (
                    <FieldError>{errors.plateNumber.message}</FieldError>
                  )}
                </Field>

                {/* VIN */}
                <Field>
                  <FieldLabel htmlFor="vin">VIN</FieldLabel>
                  <Input
                    id="vin"
                    {...register("vin")}
                    placeholder="1FTBR1C84NKA12345"
                    className={cn(
                      "h-11",
                      errors.vin && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.vin && (
                    <FieldError>{errors.vin.message}</FieldError>
                  )}
                </Field>

                {/* Current Mileage */}
                <Field>
                  <FieldLabel htmlFor="currentMileage">Current Mileage</FieldLabel>
                  <Input
                    id="currentMileage"
                    type="number"
                    {...register("currentMileage", { valueAsNumber: true })}
                    placeholder="45230"
                    className={cn(
                      "h-11",
                      errors.currentMileage && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.currentMileage && (
                    <FieldError>{errors.currentMileage.message}</FieldError>
                  )}
                </Field>

                {/* Last Oil Change Mileage */}
                <Field>
                  <FieldLabel htmlFor="lastOilChangeMileage">Last Oil Change Mileage</FieldLabel>
                  <Input
                    id="lastOilChangeMileage"
                    type="number"
                    {...register("lastOilChangeMileage", { valueAsNumber: true })}
                    placeholder="40000"
                    className={cn(
                      "h-11",
                      errors.lastOilChangeMileage && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.lastOilChangeMileage && (
                    <FieldError>{errors.lastOilChangeMileage.message}</FieldError>
                  )}
                </Field>

                {/* Insurance Expiry */}
                <Field>
                  <FieldLabel htmlFor="insuranceExpiry">Insurance Expiry</FieldLabel>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    {...register("insuranceExpiry")}
                    className={cn(
                      "h-11",
                      errors.insuranceExpiry && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.insuranceExpiry && (
                    <FieldError>{errors.insuranceExpiry.message}</FieldError>
                  )}
                </Field>

                {/* Assigned Driver */}
                <Field className="col-span-2">
                  <FieldLabel htmlFor="assignedDriver">Assigned Driver</FieldLabel>
                  <Input
                    id="assignedDriver"
                    {...register("assignedDriver")}
                    placeholder="Marcus Rivera"
                    className={cn(
                      "h-11",
                      errors.assignedDriver && "border-btn-reject focus-visible:ring-btn-reject/20"
                    )}
                  />
                  {errors.assignedDriver && (
                    <FieldError>{errors.assignedDriver.message}</FieldError>
                  )}
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
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-btn-primary text-btn-primary-txt hover:brightness-90"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}