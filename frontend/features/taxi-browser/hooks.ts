import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TaxisResponseSchema } from "./schema";
import { type Taxi } from "./types";

export function useTaxis() {
  return useQuery<Taxi[]>({
    queryKey: ["taxis"],
    queryFn: async () => {
      const response = await api.get("/api/taxis");
      return TaxisResponseSchema.parse(response.data);
    },
  });
}
