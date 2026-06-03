import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Driver } from "./types";


export function useDriverProfile() {
  return useQuery<Driver>({
    queryKey: ["driverProfile"],
    queryFn: async () => {
      const response = await api.get("/api/driver/profile");
      return response.data;
    },
  });
}

export function useUpdateDriverProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Driver>) => {
      const response = await api.put("/api/driver/profile", data);
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
      const response = await api.put("/api/driver/availability", { is_available });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["driverProfile"] });
      toast.success(variables ? "You are now online" : "You are now offline");
    },
  });
}
