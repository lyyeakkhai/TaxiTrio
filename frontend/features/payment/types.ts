import { z } from "zod";

export const PaymentStatusEnum = z.enum(["unpaid", "pending_verification", "verified", "rejected"]);

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  booking_id: z.string().uuid(),
  amount: z.number(),
  fee: z.number(),
  net_amount: z.number(),
  method: z.string(),
  status: PaymentStatusEnum,
  created_at: z.string(),
});

export type Payment = z.infer<typeof PaymentSchema>;
