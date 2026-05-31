// Server actions for manage-users feature
"use server";
import api from "@/lib/api";

export async function getUsers() {
  const { data } = await api.get("/admin/users");
  return data;
}
