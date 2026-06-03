import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BookingSchema, BookingDetailSchema, type Booking, type BookingDetail, type CreateBookingInput } from "./types";
import { z } from "zod";

export function useMyBookings() {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await api.get("/api/bookings");
      return z.array(BookingSchema).parse(response.data);
    },
  });
}

export function useBooking(id: string) {
  return useQuery<BookingDetail>({
    queryKey: ["bookings", id],
    queryFn: async () => {
      const response = await api.get(`/api/bookings/${id}`);
      return BookingDetailSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBookingInput) => {
      const response = await api.post("/api/bookings", data);
      return BookingSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/bookings/${id}/cancel`);
      return BookingSchema.parse(response.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", variables] });
    },
  });
}
