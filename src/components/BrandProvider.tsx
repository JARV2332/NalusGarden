"use client";

import { createContext, useContext } from "react";
import type { BrandSettings } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/brand";

const BrandContext = createContext<BrandSettings | null>(null);

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandSettings;
  children: React.ReactNode;
}) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const brand = useContext(BrandContext);
  if (!brand) {
    throw new Error("useBrand debe usarse dentro de BrandProvider.");
  }
  return brand;
}

export function useWhatsApp(message: string) {
  const brand = useBrand();
  return buildWhatsAppUrl(brand.whatsapp, message);
}
