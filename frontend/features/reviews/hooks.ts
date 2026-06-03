import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Review } from "./types";
import { CreateReviewInput } from "./schema";

export function useDriverReviews() {
  return useQuery<Review[]>({
    queryKey: ["driverReviews"],
    queryFn: async () => {
      const response = await api.get("/api/driver/reviews");
      return response.data;
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateReviewInput) => {
      const response = await api.post("/api/reviews", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driverReviews"] });
    },
  });
}
