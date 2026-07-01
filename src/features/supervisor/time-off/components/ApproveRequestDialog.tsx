"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

interface ApproveRequestDialogProps {
  employeeName: string;
  /** Called when the user confirms approval. Should resolve once the mutation completes. */
  onConfirm: () => Promise<void> | void;
  /** Trigger element — defaults to a styled Approve button if not provided */
  children?: React.ReactNode;
}

export function ApproveRequestDialog({
  employeeName,
  onConfirm,
  children,
}: ApproveRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children ?? (
          <Button variant={"accept"}>
            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
            Approve
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
            <CheckCircle
              className="w-5 h-5 text-btn-accept"
              strokeWidth={1.8}
            />
          </div>
          <AlertDialogTitle>Approve this request?</AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;re about to approve {employeeName}&apos;s time off request.
            They will be notified immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="accept"
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault(); // keep dialog open until async confirm finishes
              handleConfirm();
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Approve
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
