import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { AssistanceItem } from "./types";

export function useAssistance() {
  return useQuery<AssistanceItem[]>({
    queryKey: ["assistance"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ASSISTANCE.LIST);
      return response.data;
    },
  });
}
