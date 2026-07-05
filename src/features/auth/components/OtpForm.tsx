"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Loader2, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { AuthCardHeader } from "./AuthCardHeader";
import { verifyOtpSchema, type VerifyOtpFormValues } from "../schemas";
import { verifyOtp, sendOtp } from "../mocks/auth.mock";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [serverError, setServerError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  
  // Create refs using useRef with an array
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  // Focus the first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateDigit = useCallback(
    (index: number, value: string) => {
      const updated = [...digits];
      updated[index] = value.slice(-1);
      setDigits(updated);
      setValue("otp", updated.join(""));

      if (value && index < OTP_LENGTH - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    },
    [digits, setValue]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    },
    [digits]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
      if (!pasted) return;
      const updated = Array(OTP_LENGTH).fill("");
      pasted.split("").forEach((ch, i) => { updated[i] = ch; });
      setDigits(updated);
      setValue("otp", updated.join(""));
      const nextEmpty = updated.findIndex((d) => !d);
      const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
      const inputToFocus = inputRefs.current[focusIndex];
      if (inputToFocus) {
        inputToFocus.focus();
      }
    },
    [setValue]
  );

  const onSubmit = useCallback(
    async (values: VerifyOtpFormValues) => {
      setServerError(null);
      try {
        await verifyOtp(values);
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : "Verification failed.");
        setDigits(Array(OTP_LENGTH).fill(""));
        setValue("otp", "");
        reset({ otp: "" });
        // Focus the first input after a short delay
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    },
    [email, router, setValue, reset]
  );

  const handleResend = async () => {
    if (!email) return;
    await sendOtp({ email });
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  const otpString = digits.join("");

  return (
    <>
      <AuthCardHeader
        icon={ShieldCheck}
        title="Verify Your Identity"
        subtitle={email ? `Code sent to ${email}` : "Enter the 6-digit code we sent you"}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {serverError && (
          <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-btn-reject font-medium">
            {serverError}
          </div>
        )}

        {resent && (
          <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[13px] text-emerald-700 font-medium">
            A new code was sent to your email.
          </div>
        )}

        {/* OTP digit inputs */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-table-header uppercase tracking-wide">
            6-Digit Code
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[i] = el;
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]}
                onChange={(e) => updateDigit(i, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
                className={cn(
                  "flex-1 min-w-0 h-12 sm:h-14 rounded-xl border text-center",
                  "text-[18px] sm:text-[22px] font-bold text-primary-txt",
                  "transition-all duration-150 outline-none",
                  "focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20",
                  digits[i]
                    ? "border-btn-primary bg-blue-50"
                    : "border-slate-200 bg-white"
                )}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || otpString.length < OTP_LENGTH}
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
              Verifying...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" strokeWidth={2} />
              Verify Code
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-[13px]">
          <Link
            href="/forgot-password"
            className="flex items-center gap-1.5 font-semibold text-secondary-txt hover:text-primary-txt transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Go back
          </Link>
          <button
            type="button"
            onClick={handleResend}
            className="flex items-center gap-1.5 font-semibold text-btn-primary hover:underline transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" strokeWidth={2} />
            Resend code
          </button>
        </div>
      </form>
    </>
  );
}