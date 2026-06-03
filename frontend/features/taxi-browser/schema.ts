import { z } from "zod";

export const TaxiDriverSchema = z.object({
  name: z.string(),
  rating: z.number(),
  languages: z.array(z.string()),
  verification_status: z.string(),
  is_available: z.boolean(),
});

export const TaxiSchema = z.object({
  id: z.string().uuid(),
  model: z.string(),
  plate_number: z.string(),
  type: z.enum(["Sedan", "SUV", "Van", "Minibus"]),
  passenger_capacity: z.number().int().positive(),
  luggage_capacity: z.number().int().nonnegative(),
  comfort_category: z.enum(["Standard", "Premium", "VIP"]),
  photo: z.string().url(),
  is_active: z.boolean(),
  driver: TaxiDriverSchema,
});

export const TaxisResponseSchema = z.array(TaxiSchema);
