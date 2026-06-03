import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Earning } from "./types";

export function useDriverEarnings() {
  return useQuery<Earning[]>({
    queryKey: ["driverEarnings"],
    queryFn: async () => {
      const response = await api.get("/api/driver/earnings");
      return response.data;
    },
  });
}
