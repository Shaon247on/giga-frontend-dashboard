"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, CheckCircle, Loader2 } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { AuthCardHeader } from "./AuthCardHeader";
import { PasswordInput } from "@/features/supervisor/settings/components/PasswordInput";
import { resetPasswordSchema, type ResetPasswordFormValues } from "../schemas";
import { resetPassword } from "../mocks/auth.mock";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function ResetPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const newPassword = watch("newPassword");

  // Visual password strength hints
  const checks = [
    { label: "8+ characters", pass: newPassword.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(newPassword) },
    { label: "Lowercase letter", pass: /[a-z]/.test(newPassword) },
    { label: "Number", pass: /[0-9]/.test(newPassword) },
  ];

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);
    try {
      await resetPassword(values);
      setSuccess(true);
      setTimeout(() => router.push(ROUTES.dashboard), 2000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Reset failed. Try again.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-500" strokeWidth={1.8} />
        </div>
        <h2 className="text-[20px] font-bold text-primary-txt">Password Updated!</h2>
        <p className="text-[13px] text-secondary-txt">Redirecting you to the dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <AuthCardHeader
        icon={Lock}
        title="Set New Password"
        subtitle="Choose a strong password for your account"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-btn-reject font-medium">
            {serverError}
          </div>
        )}

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

        {/* Password strength checklist */}
        {newPassword.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5">
            {checks.map((check) => (
              <div
                key={check.label}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] font-medium transition-colors",
                  check.pass ? "text-emerald-600" : "text-slate-400"
                )}
              >
                <div
                  className={cn(
                    "w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0",
                    check.pass ? "bg-emerald-500" : "bg-slate-200"
                  )}
                >
                  {check.pass && (
                    <svg className="w-2 h-2 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {check.label}
              </div>
            ))}
          </div>
        )}

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

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl",
            "bg-btn-primary text-white font-semibold text-[15px]",
            "hover:brightness-90 active:scale-[0.98] transition-all duration-200 shadow-sm",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          )}
        >
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
        </button>
      </form>
    </>
  );
}