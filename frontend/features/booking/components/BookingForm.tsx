"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { CreateBookingSchema, type CreateBookingInput } from "../types";
import { useCreateBooking } from "../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, Clock, Users, FileText } from "lucide-react";
import { toast } from "sonner";

export function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();
  
  const type = searchParams.get("type") as "taxi" | "route" | "tour" || "taxi";
  const id = searchParams.get("id");

  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(CreateBookingSchema),
    defaultValues: {
      booking_type: type,
      taxi_id: type === "taxi" ? id || undefined : undefined,
      route_package_id: type === "route" ? id || undefined : undefined,
      tour_package_id: type === "tour" ? id || undefined : undefined,
      travel_date: "",
      travel_time: "",
      passenger_count: 1,
      payment_method: "khqr",
      special_notes: "",
    },
  });

  const onSubmit = async (data: CreateBookingInput) => {
    try {
      const booking = await createBooking(data);
      toast.success("Booking created successfully!");
      // Redirect to payment page
      router.push(`/customer/payments/${booking.id}`);
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">Complete your booking</h2>
        <p className="text-muted-foreground text-sm">Please fill in the details for your trip.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="travel_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travel_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="time" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passenger_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passengers</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="number" min="1" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="khqr">Bakong KHQR</SelectItem>
                      <SelectItem value="aba">ABA Pay</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="cash">Cash to Driver</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="special_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Notes (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea 
                      placeholder="Any special requests or notes for the driver..." 
                      className="pl-10 min-h-[100px]" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full btn-primary py-6 text-lg" disabled={isPending}>
            {isPending ? "Confirming..." : "Confirm Booking"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
