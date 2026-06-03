import { Earning } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/i18n/routing";

export function EarningsTable({ earnings }: { earnings: Earning[] }) {
  if (earnings.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-muted-foreground">
        No earnings recorded yet.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Booking ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earnings.map((earning) => (
            <TableRow key={earning.id}>
              <TableCell className="font-medium">
                {new Date(earning.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/driver/trips/${earning.booking_id}`} className="text-primary hover:underline font-mono text-sm">
                  {earning.booking_id.substring(0, 8)}...
                </Link>
              </TableCell>
              <TableCell className="text-right font-bold text-green-500">
                +${earning.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
