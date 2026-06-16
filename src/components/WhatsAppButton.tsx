import { MessageCircle } from "lucide-react";
import { BRAND, buildWhatsAppMessage } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppMessage("Hola Jardín de Nalu, quisiera más información.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:brightness-110"
      aria-label={`WhatsApp ${BRAND.whatsappDisplay}`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
