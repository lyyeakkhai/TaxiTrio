import { z } from 'zod'

export const CreateAssistanceSchema = z.object({
  category: z.enum(['emergency', 'language', 'route', 'whatsapp']),
  title: z.string().min(1).max(150),
  content: z.string().min(1),
  phone: z.string().optional(),
})
export type CreateAssistanceDto = z.infer<typeof CreateAssistanceSchema>

export const UpdateAssistanceSchema = CreateAssistanceSchema.partial()
export type UpdateAssistanceDto = z.infer<typeof UpdateAssistanceSchema>
