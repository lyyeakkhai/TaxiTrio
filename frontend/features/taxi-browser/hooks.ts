import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { TaxisResponseSchema } from "./schema";
import { type Taxi } from "./types";

export function useTaxis() {
  return useQuery<Taxi[]>({
    queryKey: ["taxis"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.TAXIS.LIST);
      return TaxisResponseSchema.parse(response.data);
    },
  });
}
