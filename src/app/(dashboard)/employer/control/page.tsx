import { Suspense } from "react";
import {
  ControlView,
  ControlSkeleton,
  fetchControlData,
} from "@/features/employer/control";

async function ControlContent() {
  const data = await fetchControlData();
  return <ControlView data={data} />;
}

export default function ControlPage() {
  return (
    <Suspense fallback={<ControlSkeleton />}>
      <ControlContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Control System",
};