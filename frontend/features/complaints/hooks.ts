import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Complaint, CreateComplaintInput } from "./types";

export function useMyComplaints() {
  return useQuery<Complaint[]>({
    queryKey: ["complaints"],
    queryFn: async () => {
      const response = await api.get("/api/complaints/my");
      return response.data;
    },
  });
}

export function useCreateComplaint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateComplaintInput) => {
      const response = await api.post("/api/complaints", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
}
