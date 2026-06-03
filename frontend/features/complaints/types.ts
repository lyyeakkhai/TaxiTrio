import { z } from "zod";

export const ComplaintCategoryEnum = z.enum(["driver_behavior", "vehicle_condition", "pricing", "service_quality", "other"]);

export const ComplaintSchema = z.object({
  id: z.string().uuid(),
  booking_id: z.string().uuid(),
  category: ComplaintCategoryEnum,
  description: z.string(),
  status: z.enum(["pending", "reviewed", "resolved"]),
  admin_reply: z.string().nullable(),
  created_at: z.string(),
});

export const CreateComplaintSchema = z.object({
  booking_id: z.string().uuid(),
  category: ComplaintCategoryEnum,
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type Complaint = z.infer<typeof ComplaintSchema>;
export type CreateComplaintInput = z.infer<typeof CreateComplaintSchema>;
