"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  rejectReasonSchema,
  type RejectReasonFormValues,
} from "../schemas/review.schema";

interface RejectRequestDialogProps {
  employeeName: string;
  /** Called when the user submits a valid rejection reason. */
  onConfirm: (reason: string) => Promise<void> | void;
  children?: React.ReactNode;
}

export function RejectRequestDialog({
  employeeName,
  onConfirm,
  children,
}: RejectRequestDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RejectReasonFormValues>({
    resolver: zodResolver(rejectReasonSchema),
    defaultValues: { reason: "" },
  });

  const onSubmit = async (values: RejectReasonFormValues) => {
    await onConfirm(values.reason);
    reset();
    setOpen(false);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <AlertDialogTrigger asChild>
        {children ?? (
          <Button variant={"destructive"}>
            <XCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
            Deny
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        {/* Using a real <form> inside AlertDialogContent — we prevent the
            default AlertDialogAction auto-close behavior by not using it,
            and instead drive submission through RHF's handleSubmit. */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-2">
              <XCircle className="w-5 h-5 text-btn-reject" strokeWidth={1.8} />
            </div>
            <AlertDialogTitle>Deny this request?</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for denying {employeeName}&apos;s request.
              This will be shared with them.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Reason field */}
          <div className="space-y-1.5">
            <label
              htmlFor="reject-reason"
              className="text-[12px] font-semibold text-primary-txt"
            >
              Reason for rejection
            </label>
            <Textarea
              id="reject-reason"
              placeholder="e.g. Insufficient coverage during requested dates..."
              {...register("reason")}
              aria-invalid={!!errors.reason}
            />
            {errors.reason && (
              <p className="text-[12px] text-btn-reject font-medium">
                {errors.reason.message}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="reject" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Denying...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Deny Request
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
