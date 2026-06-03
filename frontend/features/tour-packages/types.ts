import { z } from "zod";

export const TourPackageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  duration_hours: z.number(),
  location: z.string(),
  included_services: z.string(),
  vehicle_type: z.string(),
  price: z.number(),
  image: z.string().url(),
  is_active: z.boolean(),
});

export const TourPackagesResponseSchema = z.array(TourPackageSchema);

export type TourPackage = z.infer<typeof TourPackageSchema>;
export type TourPackagesResponse = z.infer<typeof TourPackagesResponseSchema>;
