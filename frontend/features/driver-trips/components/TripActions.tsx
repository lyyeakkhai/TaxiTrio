import { Button } from "@/components/ui/button";
import { BookingStatus } from "../types";
import { 
  useAcceptBooking, 
  useRejectBooking, 
  useMarkArrived, 
  useStartTrip, 
  useCompleteTrip 
} from "../hooks";
import { Check, X, MapPin, Play, Flag } from "lucide-react";

interface TripActionsProps {
  bookingId: string;
  status: BookingStatus;
}

export function TripActions({ bookingId, status }: TripActionsProps) {
  const { mutate: accept, isPending: isAccepting } = useAcceptBooking();
  const { mutate: reject, isPending: isRejecting } = useRejectBooking();
  const { mutate: arrive, isPending: isArriving } = useMarkArrived();
  const { mutate: start, isPending: isStarting } = useStartTrip();
  const { mutate: complete, isPending: isCompleting } = useCompleteTrip();

  if (status === "assigned") {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button 
          variant="default" 
          className="flex-1 bg-green-500 hover:bg-green-600 text-white" 
          onClick={() => accept(bookingId)}
          disabled={isAccepting || isRejecting}
        >
          <Check className="mr-2 h-4 w-4" /> {isAccepting ? "Accepting..." : "Accept"}
        </Button>
        <Button 
          variant="destructive" 
          className="flex-1"
          onClick={() => {
            if (confirm("Are you sure you want to reject this trip?")) {
              reject(bookingId);
            }
          }}
          disabled={isAccepting || isRejecting}
        >
          <X className="mr-2 h-4 w-4" /> {isRejecting ? "Rejecting..." : "Reject"}
        </Button>
      </div>
    );
  }

  if (status === "accepted") {
    return (
      <Button 
        className="w-full btn-primary" 
        onClick={() => arrive(bookingId)}
        disabled={isArriving}
      >
        <MapPin className="mr-2 h-4 w-4" /> {isArriving ? "Updating..." : "I've Arrived at Pickup"}
      </Button>
    );
  }

  if (status === "driver_arrived") {
    return (
      <Button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
        onClick={() => start(bookingId)}
        disabled={isStarting}
      >
        <Play className="mr-2 h-4 w-4" /> {isStarting ? "Starting..." : "Start Trip"}
      </Button>
    );
  }

  if (status === "in_progress") {
    return (
      <Button 
        className="w-full bg-purple-500 hover:bg-purple-600 text-white" 
        onClick={() => complete(bookingId)}
        disabled={isCompleting}
      >
        <Flag className="mr-2 h-4 w-4" /> {isCompleting ? "Completing..." : "Complete Trip"}
      </Button>
    );
  }

  return null;
}
