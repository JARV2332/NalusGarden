export const BRAND = {
  name: "Jardín de Nalu",
  tagline: "El lugar de los mejores eventos",
  whatsapp: "50230806445",
  whatsappDisplay: "3080-6445",
  location: "Carretera a Amatitlán, Guatemala",
  facebook: "https://www.facebook.com/JardinDeNalu",
  instagram: "https://www.instagram.com/jardindenalugt/",
  email: "eventos@jardindenalu.gt",
} as const;

export const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}`;

export function buildWhatsAppMessage(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
