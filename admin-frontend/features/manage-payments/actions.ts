// Server actions for manage-payments feature
"use server";
import api from "@/lib/api";

export async function getPayments() {
  const { data } = await api.get("/admin/payments");
  return data;
}

export async function verifyPayment(id: string) {
  const { data } = await api.put(`/admin/payments/${id}/verify`);
  return data;
}

export async function rejectPayment(id: string) {
  const { data } = await api.put(`/admin/payments/${id}/reject`);
  return data;
}
