import { Suspense } from "react";
import { SettingsView, SettingsSkeleton, fetchUserProfile } from "@/features/settings";

async function SettingsContent() {
  const profile = await fetchUserProfile();
  return <SettingsView profile={profile} />;
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Settings",
  description: "Manage your personal information and account settings",
};