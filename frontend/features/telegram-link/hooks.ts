import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { TelegramLinkCode } from "./types";
import { toast } from "sonner";

export function useGenerateTelegramCode() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post<TelegramLinkCode>("/api/driver/telegram/generate-code");
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
