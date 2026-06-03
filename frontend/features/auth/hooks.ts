import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { toast } from "sonner";
import { Driver } from "./types";


export function useDriverProfile() {
  return useQuery<Driver>({
    queryKey: ["driverProfile"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.DRIVER.PROFILE);
      return response.data;
    },
  });
}

export function useUpdateDriverProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Driver>) => {
      const response = await api.put(API_ENDPOINTS.DRIVER.PROFILE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driverProfile"] });
      toast.success("Profile updated successfully");
    },
  });
}

export function useToggleAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (is_available: boolean) => {
      const response = await api.put(API_ENDPOINTS.DRIVER.AVAILABILITY, { is_available });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["driverProfile"] });
      toast.success(variables ? "You are now online" : "You are now offline");
    },
  });
}
