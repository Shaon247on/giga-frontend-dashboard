import { RoleQuickLogin } from "@/components/auth/RoleQuickLogin";
import { SignInForm } from "@/features/auth";

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
      <RoleQuickLogin />
    </div>
  );
}

export const metadata = {
  title: "Sign In — GTS's Finest",
};
