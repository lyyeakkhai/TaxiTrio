"use client";

import { useDriverReviews } from "@/features/reviews/hooks";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Star } from "lucide-react";

export default function DriverReviewsPage() {
  const { data: reviews, isLoading, isError } = useDriverReviews();

  const averageRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Customer Reviews</h1>
          <p className="text-muted-foreground">Feedback from your completed trips.</p>
        </div>
        
        {reviews && reviews.length > 0 && (
          <div className="glass-card px-6 py-4 flex items-center space-x-4">
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold font-display mr-2">{averageRating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${star <= parseFloat(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6 h-[200px]">
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="font-bold text-xl mb-2">Failed to load reviews</h3>
          <p className="text-muted-foreground">There was an error fetching your reviews.</p>
        </div>
      )}

      {reviews && reviews.length === 0 && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <h3 className="font-bold text-xl mb-2">No reviews yet</h3>
          <p className="text-muted-foreground max-w-md">
            You haven&apos;t received any reviews. Complete more trips to get ratings from customers!
          </p>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
