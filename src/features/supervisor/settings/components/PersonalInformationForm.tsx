"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  profileSchema,
  type ProfileFormValues,
  type ProfileSubmitValues,
} from "../schemas/profile.schema";
import { updateUserProfile } from "../mocks/settings.mock";
import type { UserProfile } from "../types";

interface PersonalInformationFormProps {
  profile: UserProfile;
}

export function PersonalInformationForm({ profile }: PersonalInformationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues, unknown, ProfileSubmitValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      department: profile.department,
      managedShops: profile.managedShops,
    },
  });

  // `values` here is ProfileSubmitValues — fully validated output type
  const onSubmit = async (values: ProfileSubmitValues) => {
    await updateUserProfile(values);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm p-5 sm:p-6">
      <h2 className="text-[16px] font-bold text-primary-txt mb-5">Personal Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
            <FieldError>{errors.fullName?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="your@gmail.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
            <Input
              id="phoneNumber"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (613) 555-0192"
              aria-invalid={!!errors.phoneNumber}
              {...register("phoneNumber")}
            />
            <FieldError>{errors.phoneNumber?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input id="role" value={profile.role} disabled readOnly />
          </Field>

          <Field>
            <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
            <Input id="employeeId" value={profile.employeeId} disabled readOnly />
          </Field>

          <Field>
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Input
              id="department"
              aria-invalid={!!errors.department}
              {...register("department")}
            />
            <FieldError>{errors.department?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="managedShops">Managed Shops</FieldLabel>
            <Input
              id="managedShops"
              placeholder="e.g. Ottawa Shop, Toronto Shop"
              aria-invalid={!!errors.managedShops}
              {...register("managedShops")}
            />
            <FieldError>{errors.managedShops?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="directReports">Direct Reports</FieldLabel>
            <Input id="directReports" value={profile.directReports} disabled readOnly />
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isSubmitting || !isDirty} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  );
}