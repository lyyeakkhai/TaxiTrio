import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phone: z.string().optional(),
  role: z.enum(['customer', 'driver']),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>
