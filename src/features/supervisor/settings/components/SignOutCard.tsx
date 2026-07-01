"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { ROUTES } from "@/constants/routes";

export function SignOutCard() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    // TODO: wire up real auth sign-out (clear session, revoke token, etc.)
    await new Promise((r) => setTimeout(r, 500));
    router.push(ROUTES.home);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[15px] font-bold text-primary-txt leading-tight">Sign Out</p>
          <p className="text-[12px] text-secondary-txt leading-tight mt-0.5">
            You will be redirected to the login page
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-btn-reject text-[13px] font-semibold hover:bg-red-100 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto">
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sign Out
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-2">
                <LogOut className="w-5 h-5 text-btn-reject" strokeWidth={1.8} />
              </div>
              <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
              <AlertDialogDescription>
                You&apos;ll need to sign in again to access the supervisor workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSigningOut}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="reject"
                disabled={isSigningOut}
                onClick={(e) => {
                  e.preventDefault();
                  handleSignOut();
                }}
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}