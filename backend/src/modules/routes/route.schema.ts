import { z } from 'zod'

export const CreateRouteSchema = z.object({
  name: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  duration_hours: z.number().positive(),
  price: z.number().positive(),
  included_services: z.string().optional(),
  recommended_vehicle: z.string().optional(),
})

export type CreateRouteDto = z.infer<typeof CreateRouteSchema>

export const UpdateRouteSchema = CreateRouteSchema.partial()

export type UpdateRouteDto = z.infer<typeof UpdateRouteSchema>
