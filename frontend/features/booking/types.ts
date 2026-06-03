import { z } from "zod";

export const BookingStatusEnum = z.enum([
  "pending", "assigned", "accepted", "driver_arrived", 
  "in_progress", "completed", "cancelled", "rejected"
]);

export const BookingTypeEnum = z.enum(["taxi", "route", "tour"]);
export const PaymentMethodEnum = z.enum(["cash", "aba", "khqr", "wing", "card", "wallet", "corporate"]);

export const BookingSchema = z.object({
  id: z.string().uuid(),
  customer_id: z.string(),
  driver_id: z.string().nullable(),
  taxi_id: z.string().nullable(),
  route_package_id: z.string().nullable(),
  tour_package_id: z.string().nullable(),
  booking_type: BookingTypeEnum,
  travel_date: z.string(),
  travel_time: z.string(),
  passenger_count: z.number().int().min(1),
  payment_method: PaymentMethodEnum,
  special_notes: z.string().nullable(),
  status: BookingStatusEnum,
  created_at: z.string()
});

export const BookingStatusHistorySchema = z.object({
  id: z.string().uuid(),
  booking_id: z.string().uuid(),
  status: BookingStatusEnum,
  changed_by: z.string(),
  changed_at: z.string()
});

export const BookingDetailSchema = BookingSchema.extend({
  status_history: z.array(BookingStatusHistorySchema)
});

export const CreateBookingSchema = z.object({
  booking_type: BookingTypeEnum,
  taxi_id: z.string().optional(),
  route_package_id: z.string().optional(),
  tour_package_id: z.string().optional(),
  travel_date: z.string().min(1, "Travel date is required"),
  travel_time: z.string().min(1, "Travel time is required"),
  passenger_count: z.coerce.number().int().min(1, "At least 1 passenger required"),
  payment_method: PaymentMethodEnum,
  special_notes: z.string().optional()
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingStatusHistory = z.infer<typeof BookingStatusHistorySchema>;
export type BookingDetail = z.infer<typeof BookingDetailSchema>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
