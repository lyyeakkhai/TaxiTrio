import { z } from 'zod'

export const ReplyComplaintSchema = z.object({ reply: z.string().min(1) })
export type ReplyComplaintDto = z.infer<typeof ReplyComplaintSchema>
