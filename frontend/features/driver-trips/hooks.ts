import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Booking, BookingDetail } from "./types";
import { toast } from "sonner";

export function useDriverBookings() {
  return useQuery<Booking[]>({
    queryKey: ["driverBookings"],
    queryFn: async () => {
      const response = await api.get("/api/driver/bookings");
      return response.data;
    },
  });
}

export function useDriverBooking(id: string) {
  return useQuery<BookingDetail>({
    queryKey: ["driverBookings", id],
    queryFn: async () => {
      const response = await api.get(`/api/driver/bookings/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

function useBookingMutation(action: string, successMessage: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.put(`/api/driver/bookings/${id}/${action}`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["driverBookings"] });
      queryClient.invalidateQueries({ queryKey: ["driverBookings", id] });
      toast.success(successMessage);
    },
    onError: () => {
      toast.error(`Failed to ${action} booking.`);
    }
  });
}

export function useAcceptBooking() {
  return useBookingMutation("accept", "Booking accepted successfully!");
}

export function useRejectBooking() {
  return useBookingMutation("reject", "Booking rejected.");
}

export function useMarkArrived() {
  return useBookingMutation("arrived", "Marked as arrived.");
}

export function useStartTrip() {
  return useBookingMutation("start", "Trip started.");
}

export function useCompleteTrip() {
  return useBookingMutation("complete", "Trip completed successfully!");
}
