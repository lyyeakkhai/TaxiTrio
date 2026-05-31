// Server actions for manage-taxis feature
"use server";
import api from "@/lib/api";

export async function getTaxis() {
  const { data } = await api.get("/admin/taxis");
  return data;
}

export async function createTaxi(payload: unknown) {
  const { data } = await api.post("/admin/taxis", payload);
  return data;
}
