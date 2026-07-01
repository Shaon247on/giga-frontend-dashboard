"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, Loader2, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthCardHeader } from "./AuthCardHeader";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schemas";
import { sendOtp } from "../mocks/auth.mock";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError(null);
    try {
      await sendOtp(values);
      // Pass email to next step via search param
      router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to send code. Try again.");
    }
  };

  return (
    <>
      <AuthCardHeader
        icon={KeyRound}
        title="Forgot Password"
        subtitle="We'll send a recovery code to your email"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-btn-reject font-medium">
            {serverError}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Work Email</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-table-header" strokeWidth={1.8} />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="pl-10"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          <FieldError>{errors.email?.message}</FieldError>
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
              Sending code...
            </>
          ) : (
            <>
              Send Recovery Code
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </>
          )}
        </button>

        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-secondary-txt hover:text-primary-txt transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back to Sign In
        </Link>
      </form>
    </>
  );
}