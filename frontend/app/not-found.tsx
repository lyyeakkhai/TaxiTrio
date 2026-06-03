import { Link } from "@/i18n/routing";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <MapPinOff className="h-16 w-16 text-muted-foreground mb-6 opacity-50" />
      <h1 className="text-4xl font-display font-bold mb-2">404 - Lost your way?</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
