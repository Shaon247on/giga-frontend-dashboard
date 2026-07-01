import { z } from "zod";

export const rejectReasonSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters explaining the rejection")
    .max(500, "Reason must be under 500 characters"),
});

export type RejectReasonFormValues = z.infer<typeof rejectReasonSchema>;

export const approveNoteSchema = z.object({
  supervisorNote: z.string().trim().max(500, "Note must be under 500 characters").optional(),
});

export type ApproveNoteFormValues = z.infer<typeof approveNoteSchema>;