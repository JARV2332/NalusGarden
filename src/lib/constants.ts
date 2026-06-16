export const BRAND = {
  name: "Jardín de Nalu",
  nameEn: "Nalu's Garden",
  tagline: "El lugar de los mejores eventos",
  whatsapp: "50230806445",
  whatsappDisplay: "3080-6445",
  location: "Nalu's Garden, Amatitlán, Guatemala",
  mapsUrl: "https://maps.app.goo.gl/dD2367v4CWyWsC3Z6",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=14.4255401,-90.5530885&hl=es&z=16&output=embed",
  facebook: "https://www.facebook.com/JardinDeNalu",
  instagram: "https://www.instagram.com/jardindenalugt/",
  email: "eventos@jardindenalu.gt",
} as const;

export const WHATSAPP_URL = `https://wa.me/${BRAND.whatsapp}`;

export function buildWhatsAppMessage(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
