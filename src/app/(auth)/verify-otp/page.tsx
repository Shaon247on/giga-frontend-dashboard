import { OtpForm } from "@/features/auth";
import { connection } from "next/server";
export default async function VerifyOtpPage() {
  await connection();
  return <OtpForm />;
}

export const metadata = {
  title: "Verify Code — GTS's Finest",
};
