import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UserSchema, type User } from "./types";

export function useMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/api/auth/me");
      return UserSchema.parse(response.data);
    },
    retry: false,
  });
}
