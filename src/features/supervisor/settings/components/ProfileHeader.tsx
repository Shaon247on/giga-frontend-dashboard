"use client";

import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserProfile } from "../types";

interface ProfileHeaderProps {
  profile: UserProfile;
  onAvatarChange?: (file: File) => void;
}

export function ProfileHeader({ profile, onAvatarChange }: ProfileHeaderProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAvatarChange?.(file);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Gradient banner */}
      <div
        className="h-28 sm:h-32 w-full"
        style={{
          background:
            "radial-gradient(ellipse at center, #8B7CF6 0%, #6D4FE0 45%, #4C2FC4 100%)",
        }}
        aria-hidden="true"
      />

      {/* Avatar + role */}
      <div className="px-5 sm:px-6 pb-5">
        <div className="relative -mt-10 sm:-mt-12 w-fit">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#5B3FE0] border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-white/90">
                {profile.avatarInitials}
              </span>
            )}
          </div>

          {/* Camera upload button */}
          <label
            className={cn(
              "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200",
              "flex items-center justify-center cursor-pointer",
              "hover:bg-slate-50 transition-colors duration-150"
            )}
          >
            <Camera className="w-3.5 h-3.5 text-secondary-txt" strokeWidth={2} />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileSelect}
              aria-label="Upload profile photo"
            />
          </label>
        </div>

        {/* Role badge */}
        <span className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-[12px] font-semibold bg-violet-50 text-violet-600 border border-violet-100">
          {profile.role}
        </span>
      </div>
    </div>
  );
}