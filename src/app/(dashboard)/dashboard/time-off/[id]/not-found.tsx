import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function TimeOffRequestNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center">
      <p className="text-5xl font-bold text-slate-200 mb-4">404</p>
      <h2 className="text-lg font-bold text-primary-txt mb-2">Request not found</h2>
      <p className="text-sm text-secondary-txt mb-6">
        This time off request doesn&apos;t exist or was removed.
      </p>
      <Link
        href={ROUTES.timeOff}
        className="px-5 py-2.5 rounded-xl bg-btn-primary text-btn-primary-txt text-sm font-semibold hover:brightness-90 transition-all"
      >
        Back to Time Off Review
      </Link>
    </div>
  );
}