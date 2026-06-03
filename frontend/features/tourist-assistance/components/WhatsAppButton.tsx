import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  className?: string;
}

export function WhatsAppButton({ 
  message = "Hello TaxiTrio Support, I need some assistance.", 
  phoneNumber = "+85598765432", 
  className 
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Button 
      onClick={handleClick} 
      className={`bg-[#25D366] hover:bg-[#20bd5a] text-white ${className}`}
    >
      <MessageCircle className="h-5 w-5 mr-2" />
      Contact via WhatsApp
    </Button>
  );
}
