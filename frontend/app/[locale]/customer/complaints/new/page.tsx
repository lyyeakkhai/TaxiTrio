import { ComplaintForm } from "@/features/complaints/components/ComplaintForm";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function NewComplaintPage() {
  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 pb-24">
      <Link href="/customer/complaints" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Complaints
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Submit a Complaint</h1>
        <p className="text-muted-foreground">Our support team will review your issue and respond as soon as possible.</p>
      </div>
      
      <ComplaintForm />
    </div>
  );
}
