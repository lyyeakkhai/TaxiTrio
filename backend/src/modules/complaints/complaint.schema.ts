import { z } from 'zod'

export const ReplyComplaintSchema = z.object({ reply: z.string().min(1) })
export type ReplyComplaintDto = z.infer<typeof ReplyComplaintSchema>

export const CreateComplaintSchema = z.object({
  booking_id: z.string().uuid(),
  category: z.enum(['driver_behavior', 'vehicle_condition', 'pricing', 'service_quality', 'other']),
  description: z.string().min(1),
})
export type CreateComplaintDto = z.infer<typeof CreateComplaintSchema>
