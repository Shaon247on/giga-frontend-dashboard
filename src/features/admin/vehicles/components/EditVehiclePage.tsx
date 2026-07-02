"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  FieldSet,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { createVehicleSchema, type CreateVehicleFormData } from "../schemas";
import type { Vehicle } from "../types";

interface EditVehiclePageProps {
  vehicle: Vehicle;
}

export function EditVehiclePage({ vehicle }: EditVehiclePageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    // watch,
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
      router.push(`/admin/vehicles`);
      router.refresh();
    } catch (error) {
      console.error("Failed to update vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/admin/vehicles`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-secondary-txt hover:text-primary-txt transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to vehicle details
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary-txt leading-tight">
              Edit Vehicle
            </h1>
            <StatusBadge status={vehicle.status} />
          </div>
          <p className="text-sm text-secondary-txt mt-1">
            Update vehicle information and compliance details.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-btn-primary text-btn-primary-txt hover:brightness-90"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}