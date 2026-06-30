import { ProfileHeader } from "./ProfileHeader";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { PasswordSecurityForm } from "./PasswordSecurityForm";
import { SignOutCard } from "./SignOutCard";
import type { UserProfile } from "../types";

interface SettingsViewProps {
  profile: UserProfile;
}

export function SettingsView({ profile }: SettingsViewProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary-txt leading-tight">Settings</h1>
        <p className="text-sm text-secondary-txt mt-1">
          Manage your personal information and account settings
        </p>
      </div>

      <ProfileHeader profile={profile} />
      <PersonalInformationForm profile={profile} />
      <PasswordSecurityForm />
      <SignOutCard />
    </div>
  );
}