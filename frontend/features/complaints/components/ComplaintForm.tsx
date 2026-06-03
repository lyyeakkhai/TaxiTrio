"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateComplaint } from "../hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ComplaintCategoryEnum } from "../types";

export function ComplaintForm() {
  const router = useRouter();
  const { mutateAsync: createComplaint, isPending } = useCreateComplaint();
  const [bookingId, setBookingId] = useState("");
  const [category, setCategory] = useState<string>("service_quality");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    try {
      await createComplaint({
        booking_id: bookingId,
        category: category as any,
        description,
      });
      toast.success("Complaint submitted successfully");
      router.push("/customer/complaints");
    } catch (error) {
      toast.error("Failed to submit complaint.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 space-y-6">
      <div className="space-y-3">
        <Label htmlFor="bookingId">Booking ID</Label>
        <Input
          id="bookingId"
          placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {ComplaintCategoryEnum.options.map((opt) => (
            <option key={opt} value={opt} className="capitalize">
              {opt.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please describe your issue in detail..."
          className="h-32 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Complaint"}
      </Button>
    </form>
  );
}
