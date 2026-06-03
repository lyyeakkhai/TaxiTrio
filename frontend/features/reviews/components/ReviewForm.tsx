"use client";

import { useState } from "react";
import { useCreateReview } from "../hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ReviewFormProps {
  bookingId: string;
}

export function ReviewForm({ bookingId }: ReviewFormProps) {
  const { mutateAsync: createReview, isPending } = useCreateReview();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    
    try {
      await createReview({ booking_id: bookingId, rating, message: message || undefined });
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.response?.status === 400 && (error as any)?.response?.data?.message?.includes("already")) {
         setSubmitted(true);
         toast.info("You have already reviewed this trip.");
      } else {
        toast.error("Failed to submit review.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-6 mt-8 text-center bg-state-success/10 border-state-success/20">
        <h3 className="text-lg font-display font-semibold text-state-success mb-2">Thank You!</h3>
        <p className="text-sm text-muted-foreground">Your review has been submitted.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mt-8">
      <h3 className="text-xl font-display font-semibold mb-4">Rate Your Trip</h3>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? "fill-accent-primary text-accent-primary"
                      : "text-muted-foreground"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your experience..."
            className="resize-none h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={isPending || rating === 0}>
          {isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
