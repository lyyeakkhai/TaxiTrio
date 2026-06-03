export type Review = {
  id: string;
  booking_id: string;
  rating: number;
  message: string | null;
  customer_name: string;
  created_at: string;
};
