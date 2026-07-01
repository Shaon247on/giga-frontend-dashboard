"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fast = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) { clearInterval(fast); return p; }
        return p + 12;
      });
    }, 120);

    const finish = setTimeout(() => {
      setProgress(100);
      setTimeout(() => router.replace("/sign-in"), 300);
    }, 1200);

    return () => {
      clearInterval(fast);
      clearTimeout(finish);
    };
  }, [router]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: "linear-gradient(to top, #1D4ED8 0%, #0F2D5E 50%, #0A1F40 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-30"
        style={{ backgroundColor: "#3B82F6", filter: "blur(80px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-30"
        style={{ backgroundColor: "#3B82F6", filter: "blur(80px)" }}
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-5 text-center">
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center border"
          style={{ backgroundColor: "#FFFFFF1F", borderColor: "#FFFFFF33" }}
        >
          <Image
            src="/logo.png"
            alt="GTS's Finest"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            GTS&apos;S FINEST
          </h1>
          <p className="text-blue-300 text-[14px] sm:text-[15px] font-medium tracking-[0.12em] uppercase">
            Restoration Services Inc.
          </p>
        </div>

        <div className="w-40 sm:w-52 space-y-2.5">
          <div className="h-0.5 w-full bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/70 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-blue-300/80 text-[12px] font-medium">Loading...</p>
        </div>
      </div>

      <p className="absolute bottom-6 text-[12px] text-blue-400/60 font-medium">
        © 2026 Employee Operations Management.
      </p>
    </div>
  );
}