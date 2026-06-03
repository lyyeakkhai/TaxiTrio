import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Review } from "./types";

export function useDriverReviews() {
  return useQuery<Review[]>({
    queryKey: ["driverReviews"],
    queryFn: async () => {
      const response = await api.get("/api/driver/reviews");
      return response.data;
    },
  });
}
