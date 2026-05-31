// Server actions for manage-routes feature
"use server";
import api from "@/lib/api";

export async function getRoutes() {
  const { data } = await api.get("/admin/routes");
  return data;
}

export async function createRoute(payload: unknown) {
  const { data } = await api.post("/admin/routes", payload);
  return data;
}
