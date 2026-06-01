import { z } from 'zod'

export const CreateTaxiSchema = z.object({
  model: z.string().min(1),
  plate_number: z.string().min(1),
  type: z.string().min(1),
  passenger_capacity: z.number().int().min(1),
  luggage_capacity: z.number().int().min(0),
  comfort_category: z.string().min(1),
})

export type CreateTaxiDto = z.infer<typeof CreateTaxiSchema>

export const UpdateTaxiSchema = CreateTaxiSchema.partial()

export type UpdateTaxiDto = z.infer<typeof UpdateTaxiSchema>
