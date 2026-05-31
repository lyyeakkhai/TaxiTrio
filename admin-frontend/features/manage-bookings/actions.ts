// Server actions for manage-bookings feature
"use server";
import api from "@/lib/api";

export async function getBookings() {
  const { data } = await api.get("/admin/bookings");
  return data;
}

export async function assignDriver(bookingId: string, driverId: string) {
  const { data } = await api.put(`/admin/bookings/${bookingId}/assign-driver`, { driverId });
  return data;
}
