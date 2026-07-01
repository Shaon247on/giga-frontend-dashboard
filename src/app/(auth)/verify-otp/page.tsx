import { Suspense } from "react";
import { OtpForm } from "@/features/auth";

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <OtpForm />
    </Suspense>
  );
}

export const metadata = {
  title: "Verify Code — GTS's Finest",
};