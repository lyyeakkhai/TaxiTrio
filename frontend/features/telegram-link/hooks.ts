import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { TelegramLinkCode } from "./types";
import { toast } from "sonner";

export function useGenerateTelegramCode() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post<TelegramLinkCode>(API_ENDPOINTS.DRIVER.TELEGRAM.GENERATE_CODE);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Code generated successfully");
    },
    onError: () => {
      toast.error("Failed to generate code");
    },
  });
}
