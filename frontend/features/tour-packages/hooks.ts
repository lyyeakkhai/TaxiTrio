import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { TourPackageSchema, TourPackagesResponseSchema, type TourPackage } from "./types";

export function useTours() {
  return useQuery<TourPackage[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.TOURS.LIST);
      return TourPackagesResponseSchema.parse(response.data);
    },
  });
}

export function useTour(id: string) {
  return useQuery<TourPackage>({
    queryKey: ["tours", id],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.TOURS.DETAIL(id));
      return TourPackageSchema.parse(response.data);
    },
    enabled: !!id,
  });
}
