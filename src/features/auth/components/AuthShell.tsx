import type { ReactNode } from "react";
import Image from "next/image";
import { ShieldCheck, KeyRound, Flame } from "lucide-react";

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left: Dark branding panel ── */}
      <div
        className="relative hidden lg:flex lg:w-[44%] flex-col justify-between p-10 xl:p-14 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0A1F40 0%, #0F2D5E 50%, #1D4ED8 100%)",
        }}
      >
        {/* Decorative blurred circle — top right */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20"
          style={{ backgroundColor: "#3B82F6", filter: "blur(60px)" }}
          aria-hidden="true"
        />
        {/* Decorative blurred circle — bottom left */}
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-20"
          style={{ backgroundColor: "#3B82F6", filter: "blur(60px)" }}
          aria-hidden="true"
        />

        {/* Brand */}
        <div className="relative flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0"
            style={{ backgroundColor: "#FFFFFF1F", borderColor: "#FFFFFF33" }}
          >
            <Image
              src="/logo.png"
              alt="GTS's Finest logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-white font-bold text-[18px] leading-tight tracking-tight">
              GTS&apos;S FINEST
            </p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative space-y-4">
          <h1 className="text-white text-4xl xl:text-5xl font-extrabold leading-tight">
            Supervisor
            <br />
            <span className="text-slate-300">Secure Panel</span>
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xs">
            Manage your team&apos;s attendance, time off, and vehicle maintenance from one place.
          </p>

          {/* Feature badges */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <FeatureBadge
              icon={<ShieldCheck className="w-4 h-4 text-emerald-400" strokeWidth={2} />}
              title="Role Protected"
              subtitle="Access by invite only"
            />
            <FeatureBadge
              icon={<KeyRound className="w-4 h-4 text-blue-300" strokeWidth={2} />}
              title="OTP Recovery"
              subtitle="Secure password reset"
            />
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-[12px] text-slate-500">
          © 2026 Employee Operations Management.
        </p>
      </div>

      {/* ── Right: Light form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F6F8FB] px-4 py-12 sm:px-8">
        {/* Mobile brand header */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              background: "linear-gradient(135deg, #0F2D5E, #1D4ED8)",
              borderColor: "#FFFFFF33",
            }}
          >
            <Flame className="w-5 h-5 text-white" />
          </div>
          <p className="text-[#0F172B] font-bold text-[16px]">GTS&apos;S FINEST</p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureBadge({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-4 border"
      style={{ backgroundColor: "#FFFFFF0D", borderColor: "#FFFFFF1A" }}
    >
      {icon}
      <div>
        <p className="text-white text-[13px] font-bold leading-tight">{title}</p>
        <p className="text-slate-400 text-[11px] leading-tight mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}