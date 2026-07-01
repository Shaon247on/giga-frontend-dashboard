"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthCardHeader } from "./AuthCardHeader";
import { PasswordInput } from "@/features/supervisor/settings/components/PasswordInput";
import { signInSchema, type SignInFormValues } from "../schemas";
import { signIn } from "../mocks/auth.mock";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setServerError(null);
    try {
      await signIn(values);
      router.push(ROUTES.dashboard);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Sign in failed. Try again.");
    }
  };

  return (
    <>
      <AuthCardHeader
        icon={Shield}
        title="Supervisor Sign In"
        subtitle="Team Manager · invite-only access"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Server error banner */}
        {serverError && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-btn-reject font-medium">
            {serverError}
          </div>
        )}

        {/* Email */}
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

        {/* Password */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/forgot-password"
              className="text-[12px] font-semibold text-btn-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-table-header z-10" strokeWidth={1.8} />
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="password"
              className="pl-10"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
          </div>
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl mt-2",
            "bg-btn-primary text-white font-semibold text-[15px]",
            "hover:brightness-90 active:scale-[0.98] transition-all duration-200 shadow-sm",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </>
          )}
        </button>

        {/* Footer note */}
        <p className="text-center text-[12px] text-secondary-txt pt-1">
          Don&apos;t have an account? Contact your company admin.
        </p>
      </form>
    </>
  );
}