import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { Complaint, CreateComplaintInput } from "./types";

export function useMyComplaints() {
  return useQuery<Complaint[]>({
    queryKey: ["complaints"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.COMPLAINTS.MY);
      return response.data;
    },
  });
}

export function useCreateComplaint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateComplaintInput) => {
      const response = await api.post(API_ENDPOINTS.COMPLAINTS.CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
}
