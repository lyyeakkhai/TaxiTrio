import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { Earning } from "./types";

export function useDriverEarnings() {
  return useQuery<Earning[]>({
    queryKey: ["driverEarnings"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.DRIVER.EARNINGS);
      return response.data;
    },
  });
}
