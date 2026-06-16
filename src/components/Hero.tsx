"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useBrand, useWhatsApp } from "./BrandProvider";

export function Hero() {
  const brand = useBrand();
  const quoteWhatsApp = useWhatsApp("Hola, quisiera cotizar un evento en Jardín de Nalu.");
  return (
    <section id="inicio" className="hero-gradient relative min-h-[100dvh] overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-24 h-40 w-40 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-gold-light blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/10 px-4 py-2 text-sm text-gold-light">
            <Sparkles className="h-4 w-4" />
            Amatitlán, Guatemala
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl xl:text-7xl">
            {brand.tagline}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:mt-6 sm:text-lg">
            {brand.heroDescription}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#cotizar" className="btn-primary bg-gold text-brown-dark hover:bg-gold-light">
              Solicitar cotización
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={quoteWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp {brand.whatsappDisplay}
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:mt-12 sm:grid-cols-3 sm:pt-8">
            {[
              { value: "2", label: "Espacios únicos" },
              { value: "Todo incluido", label: "Paquetes completos" },
              { value: "40+", label: "Invitados mínimo" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                <p className="font-serif text-xl font-semibold text-gold-light sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-sm text-cream/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="gallery-pattern min-h-48 rounded-[1.5rem] border border-gold/20 p-5 shadow-2xl sm:min-h-56 sm:rounded-[2rem] sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-light sm:text-sm">
              {brand.name} · {brand.nameEn}
            </p>
            <p className="mt-3 font-serif text-2xl text-cream sm:mt-4 sm:text-3xl">
              Celebraciones con elegancia natural
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[1.5rem] border border-gold/20 bg-white/10 p-5 backdrop-blur-sm sm:rounded-[1.75rem] sm:p-6">
              <p className="font-serif text-xl text-gold-light sm:text-2xl">Q. 185</p>
              <p className="mt-2 text-sm text-cream/80">Por persona · mínimo 40 invitados</p>
            </div>
            <div className="rounded-[1.5rem] border border-gold/20 bg-white/10 p-5 backdrop-blur-sm sm:rounded-[1.75rem] sm:p-6">
              <p className="font-serif text-xl text-gold-light sm:text-2xl">Q. 199.99</p>
              <p className="mt-2 text-sm text-cream/80">Nalu&apos;s Lake · mínimo 50 invitados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
