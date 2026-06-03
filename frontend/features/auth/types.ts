import { z } from "zod";

export type Driver = {
  id: string;
  user_id: string;
  license_number: string;
  languages: string[];
  verification_status: "pending" | "approved" | "rejected";
  rating: number;
  is_available: boolean;
  telegram_chat_id: string | null;
};


export const UserSchema = z.object({
  id: z.string().uuid(),
  clerk_id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  profile_photo: z.string().url().nullable().optional(),
  role: z.enum(["customer", "driver", "admin"]),
});

export type User = z.infer<typeof UserSchema>;
