import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { PaymentSchema, type Payment } from "./types";

export function usePayment(bookingId: string) {
  return useQuery<Payment>({
    queryKey: ["payments", bookingId],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.PAYMENTS.DETAIL(bookingId));
      return PaymentSchema.parse(response.data);
    },
    enabled: !!bookingId,
  });
}

// Placeholder for Bakong KHQR SDK initialization
export function useInitiatePayment() {
  return useMutation({
    mutationFn: async (bookingId: string) => {
      // In a real implementation, this would call the backend to get a KHQR string or payment token
      const response = await api.post(API_ENDPOINTS.PAYMENTS.INITIATE(bookingId));
      return response.data;
    },
  });
}
