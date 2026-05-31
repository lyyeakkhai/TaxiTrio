// Server actions for manage-tours feature
"use server";
import api from "@/lib/api";

export async function getTours() {
  const { data } = await api.get("/admin/tours");
  return data;
}

export async function createTour(payload: unknown) {
  const { data } = await api.post("/admin/tours", payload);
  return data;
}
