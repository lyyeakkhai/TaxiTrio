import { z } from 'zod'

export const CreateReviewSchema = z.object({
  booking_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  message: z.string().optional(),
})

export type CreateReviewDto = z.infer<typeof CreateReviewSchema>
