import { z } from 'zod'

export const CreateBookingSchema = z.object({
  booking_type: z.enum(['taxi', 'route', 'tour']),
  taxi_id: z.string().uuid().optional(),
  route_package_id: z.string().uuid().optional(),
  tour_package_id: z.string().uuid().optional(),
  travel_date: z.string().datetime(),
  travel_time: z.string(),
  passenger_count: z.number().int().min(1),
  payment_method: z.enum(['cash', 'aba', 'khqr', 'wing']),
  special_notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.booking_type === 'taxi' && !data.taxi_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'taxi_id required for taxi bookings', path: ['taxi_id'] })
  }
  if (data.booking_type === 'route' && !data.route_package_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'route_package_id required for route bookings', path: ['route_package_id'] })
  }
  if (data.booking_type === 'tour' && !data.tour_package_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'tour_package_id required for tour bookings', path: ['tour_package_id'] })
  }
})

export type CreateBookingDto = z.infer<typeof CreateBookingSchema>

export const AssignBookingSchema = z.object({ driver_id: z.string().uuid() })
export type AssignBookingDto = z.infer<typeof AssignBookingSchema>
