import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AssistanceItem } from "./types";

export function useAssistance() {
  return useQuery<AssistanceItem[]>({
    queryKey: ["assistance"],
    queryFn: async () => {
      const response = await api.get("/api/assistance");
      return response.data;
    },
  });
}
