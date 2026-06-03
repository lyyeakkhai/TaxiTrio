import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { RoutePackageSchema, RoutePackagesResponseSchema, type RoutePackage } from "./types";

export function useRoutes() {
  return useQuery<RoutePackage[]>({
    queryKey: ["routes"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ROUTES.LIST);
      return RoutePackagesResponseSchema.parse(response.data);
    },
  });
}

export function useRoute(id: string) {
  return useQuery<RoutePackage>({
    queryKey: ["routes", id],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ROUTES.DETAIL(id));
      return RoutePackageSchema.parse(response.data);
    },
    enabled: !!id,
  });
}
