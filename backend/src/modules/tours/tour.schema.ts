import { z } from 'zod'

export const CreateTourSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  duration_hours: z.number().positive(),
  location: z.string().min(1),
  included_services: z.string().optional(),
  vehicle_type: z.string().optional(),
  price: z.number().positive(),
})

export type CreateTourDto = z.infer<typeof CreateTourSchema>

export const UpdateTourSchema = CreateTourSchema.partial()

export type UpdateTourDto = z.infer<typeof UpdateTourSchema>
