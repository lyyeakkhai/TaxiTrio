// Server actions for manage-complaints feature
"use server";
import api from "@/lib/api";

export async function getComplaints() {
  const { data } = await api.get("/admin/complaints");
  return data;
}

export async function replyToComplaint(id: string, reply: string) {
  const { data } = await api.put(`/admin/complaints/${id}/reply`, { reply });
  return data;
}
