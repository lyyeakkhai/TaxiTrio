export type BookingStatus = 
  | "pending" 
  | "assigned" 
  | "accepted" 
  | "driver_arrived" 
  | "in_progress" 
  | "completed" 
  | "cancelled" 
  | "rejected";

export type Booking = {
  id: string;
  customer_id: string;
  driver_id: string | null;
  taxi_id: string | null;
  route_package_id: string | null;
  tour_package_id: string | null;
  booking_type: "taxi" | "route" | "tour";
  travel_date: string;
  travel_time: string;
  passenger_count: number;
  payment_method: string;
  special_notes: string | null;
  status: BookingStatus;
  created_at: string;
};

export type BookingStatusHistory = {
  id: string;
  booking_id: string;
  status: BookingStatus;
  changed_by: string;
  changed_at: string;
};

export type BookingDetail = Booking & {
  status_history: BookingStatusHistory[];
  customer_name?: string;
  customer_phone?: string;
};
