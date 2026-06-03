import { z } from "zod";

export const RoutePackageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  origin: z.string(),
  destination: z.string(),
  duration_hours: z.number(),
  price: z.number(),
  included_services: z.string(),
  recommended_vehicle: z.string(),
  image: z.string().url(),
  is_active: z.boolean(),
});

export const RoutePackagesResponseSchema = z.array(RoutePackageSchema);

export type RoutePackage = z.infer<typeof RoutePackageSchema>;
export type RoutePackagesResponse = z.infer<typeof RoutePackagesResponseSchema>;
