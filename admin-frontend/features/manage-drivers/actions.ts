// Server actions for manage-drivers feature
"use server";
import api from "@/lib/api";

export async function getDrivers() {
  const { data } = await api.get("/admin/drivers");
  return data;
}

export async function verifyDriver(id: string, status: "approved" | "rejected") {
  const { data } = await api.put(`/admin/drivers/${id}/verify`, { status });
  return data;
}
