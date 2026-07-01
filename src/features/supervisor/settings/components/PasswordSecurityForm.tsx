"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ChevronDown, Loader2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { cn } from "@/lib/utils";
import { passwordSchema, type PasswordFormValues } from "../schemas/password.schema";
import { updateUserPassword } from "../mocks/settings.mock";

export function PasswordSecurityForm() {
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    try {
      await updateUserPassword(values);
      reset();
      // TODO: surface a toast / success state once a toast system exists
    } catch (err) {
      setError("currentPassword", {
        message: err instanceof Error ? err.message : "Failed to update password",
      });
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-secondary-txt" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-primary-txt leading-tight">
              Password &amp; Security
            </p>
            <p className="text-[12px] text-secondary-txt leading-tight mt-0.5">
              Change your login password
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-secondary-txt shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-5 border-t border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Current Password — full width */}
            <Field>
              <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
              <PasswordInput
                id="currentPassword"
                autoComplete="current-password"
                placeholder="Enter current password"
                aria-invalid={!!errors.currentPassword}
                {...register("currentPassword")}
              />
              <FieldError>{errors.currentPassword?.message}</FieldError>
            </Field>

            <FieldGroup>
              {/* New Password */}
              <Field>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <PasswordInput
                  id="newPassword"
                  autoComplete="new-password"
                  placeholder="New password"
                  aria-invalid={!!errors.newPassword}
                  {...register("newPassword")}
                />
                <FieldError>{errors.newPassword?.message}</FieldError>
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <PasswordInput
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                <FieldError>{errors.confirmPassword?.message}</FieldError>
              </Field>
            </FieldGroup>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}