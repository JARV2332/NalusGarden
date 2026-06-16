import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} / ${BRAND.nameEn} | ${BRAND.tagline}`,
  description:
    `${BRAND.nameEn} en Amatitlán, Guatemala. Paquetes todo incluido para bodas, quince años, bautizos y más.`,
  metadataBase: new URL("https://nalus-garden.vercel.app"),
  openGraph: {
    title: `${BRAND.name} / ${BRAND.nameEn}`,
    description: BRAND.tagline,
    locale: "es_GT",
    type: "website",
    images: [{ url: "/logo.png", alt: `${BRAND.name} / ${BRAND.nameEn}` }],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lato.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
