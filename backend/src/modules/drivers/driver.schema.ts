import { z } from 'zod'

export const UpdateDriverProfileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  languages: z.array(z.string()).optional(),
})

export const ToggleAvailabilitySchema = z.object({
  is_available: z.boolean(),
})

export const UpdateDriverAdminSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  languages: z.array(z.string()).optional(),
  taxi_id: z.string().nullable().optional(),
})

export type UpdateDriverProfileDto = z.infer<typeof UpdateDriverProfileSchema>
export type ToggleAvailabilityDto = z.infer<typeof ToggleAvailabilitySchema>
export type UpdateDriverAdminDto = z.infer<typeof UpdateDriverAdminSchema>
