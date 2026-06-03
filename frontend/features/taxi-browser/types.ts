import { z } from "zod";
import { TaxiSchema, TaxiDriverSchema, TaxisResponseSchema } from "./schema";

export type TaxiDriver = z.infer<typeof TaxiDriverSchema>;
export type Taxi = z.infer<typeof TaxiSchema>;
export type TaxisResponse = z.infer<typeof TaxisResponseSchema>;
