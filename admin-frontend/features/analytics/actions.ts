// Server actions for analytics feature
"use server";
import api from "@/lib/api";

export async function getAnalytics() {
  const { data } = await api.get("/admin/analytics");
  return data;
}
