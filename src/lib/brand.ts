export type BrandSettings = {
  name: string;
  nameEn: string;
  tagline: string;
  heroDescription: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  location: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  facebook: string;
  instagram: string;
};

export function buildWhatsAppUrl(whatsapp: string, message: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}
