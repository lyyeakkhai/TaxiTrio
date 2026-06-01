import { z } from 'zod'

export const UpdateDriverProfileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  languages: z.array(z.string()).optional(),
})

export const ToggleAvailabilitySchema = z.object({
  is_available: z.boolean(),
})

export type UpdateDriverProfileDto = z.infer<typeof UpdateDriverProfileSchema>
export type ToggleAvailabilityDto = z.infer<typeof ToggleAvailabilitySchema>
