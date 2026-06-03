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
