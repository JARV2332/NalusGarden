import fs from "fs/promises";
import path from "path";
import { BRAND } from "@/lib/constants";
import type { BrandSettings } from "@/lib/brand";

const SETTINGS_FILE = path.join(process.cwd(), "data", "site-settings.json");

export type SiteSettings = {
  tagline: string;
  heroDescription: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  location: string;
};

export type { BrandSettings } from "@/lib/brand";

export const defaultSiteSettings: SiteSettings = {
  tagline: BRAND.tagline,
  heroDescription:
    "Bodas, quince años, bautizos, eventos empresariales y mucho más. Paquetes todo incluido con el cariño, la elegancia y el detalle que nos caracteriza.",
  whatsapp: BRAND.whatsapp,
  whatsappDisplay: BRAND.whatsappDisplay,
  email: BRAND.email,
  location: BRAND.location,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    return { ...defaultSiteSettings, ...parsed };
  } catch {
    return { ...defaultSiteSettings };
  }
}

export async function saveSiteSettings(settings: SiteSettings) {
  await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true });
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

export async function getBrandSettings(): Promise<BrandSettings> {
  const settings = await getSiteSettings();
  return {
    name: BRAND.name,
    nameEn: BRAND.nameEn,
    tagline: settings.tagline,
    heroDescription: settings.heroDescription,
    whatsapp: settings.whatsapp,
    whatsappDisplay: settings.whatsappDisplay,
    email: settings.email,
    location: settings.location,
    mapsUrl: BRAND.mapsUrl,
    mapsEmbedUrl: BRAND.mapsEmbedUrl,
    facebook: BRAND.facebook,
    instagram: BRAND.instagram,
  };
}
