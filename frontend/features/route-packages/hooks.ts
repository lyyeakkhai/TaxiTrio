import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { RoutePackageSchema, RoutePackagesResponseSchema, type RoutePackage } from "./types";

export function useRoutes() {
  return useQuery<RoutePackage[]>({
    queryKey: ["routes"],
    queryFn: async () => {
      const response = await api.get("/api/routes");
      return RoutePackagesResponseSchema.parse(response.data);
    },
  });
}

export function useRoute(id: string) {
  return useQuery<RoutePackage>({
    queryKey: ["routes", id],
    queryFn: async () => {
      const response = await api.get(`/api/routes/${id}`);
      return RoutePackageSchema.parse(response.data);
    },
    enabled: !!id,
  });
}
