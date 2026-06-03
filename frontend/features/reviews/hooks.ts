import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { Review } from "./types";
import { CreateReviewInput } from "./schema";

export function useDriverReviews() {
  return useQuery<Review[]>({
    queryKey: ["driverReviews"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.DRIVER.REVIEWS);
      return response.data;
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateReviewInput) => {
      const response = await api.post(API_ENDPOINTS.REVIEWS.CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driverReviews"] });
    },
  });
}
